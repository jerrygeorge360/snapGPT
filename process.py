import os
import random
import requests
from flask import Flask, request, render_template, make_response, send_file, url_for, redirect, g
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
from camera_processor import Base64ToImage
from tutpillow import *
from pdfConverter import *
from auth import *
from database import *
from datetime import datetime, timedelta

app = Flask(__name__)
cors = CORS(app)
secret_key = os.environ['SECRET_KEY']
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = secret_key

secure_routes = ['/q', '/upload/image', '/camera', '/pdf', '/', '/history_query', '/history']


@app.before_request
def do_before():
    print(request.path)
    if request.path == '/login':
        client_token = request.cookies.get('access_token')
        if client_token:
            return redirect('/')
        return
    elif request.path in secure_routes:
        client_token = request.cookies.get('access_token')
        if client_token:
            decoded = decoder(token=client_token, key=secret_key, algorithm='HS256')
            if decoded:
                g.current_user = decoded
                print('this is g')
                print(g.get('current_user'))

                return
            else:
                # res = decoded[0]
                return 'invalid'
                # print(res)
                # return res
                # request.decoded_response = decoded[0]
        else:
            return redirect('/login')


def pdf_converter(data):
    pdf_file = PDF("downloads")
    pdf_file.read_directly(data)


@app.route("/")
@cross_origin()
def f():
    return render_template("camera.html")


@app.route("/login", methods=["GET", "POST"])
@cross_origin()
def login():
    if request.method == "POST":
        data = request.form
        email = data['email']
        password = data['password']

        db_obj = return_query(f"SELECT * from users WHERE email='{email}'", False)
        print(db_obj)
        if db_obj:
            password_check = confirm_hasher(password, db_obj[3])
            if password_check:
                current_time = datetime.utcnow()
                expiration_time = current_time + timedelta(minutes=4320)
                print(expiration_time)

                payload = {'sub': email, "iat": current_time,
                           'exp': expiration_time}
                encoded = encoder(payload, secret_key)
                return {'ok': True, 'Access-Token': encoded, 'Cookie-Expiration': expiration_time}, 200
            else:
                return {"error": "Authentication failed", "message": "Incorrect username or password"}
        else:
            return {"error": "Authentication failed", "message": "Incorrect username or password"}

    return render_template("login.html")


@app.route("/signup", methods=["GET", "POST"])
@cross_origin()
def signup():
    if request.method == "POST":
        data = request.form
        name = data['user_name']
        email = data['email']
        password = data['password']
        hash_password = hasher(password).decode('utf-8')
        query = f"INSERT INTO users(name,email,password) VALUES('{name}','{email}','{hash_password}');"
        print(query)
        db_query = write_query(query)

        if db_query == 200:
            return redirect('/login')
        else:
            return {"error": "Registration failed", "message": "Email already exists"}, 401

    return render_template("signup.html")


@app.route('/test')
def test():
    return render_template('test.html')


# @app.route("/q")
# @cross_origin()
# def stuff():
#     print(app.url_map)
#     print(request.cookies.get('access_token'))
#     return render_template("index.html")


@app.post("/upload/image")
@cross_origin()
def hello():
    response = ''
    if request.method == "POST":
        image = request.files['file']
        path = os.path.join("static/uploads", secure_filename(image.filename))
        image.save(path)
        text = convert_image_to_text(path)
        try:
            os.remove(path)
        except FileNotFoundError:
            pass
        if text == '':
            response = {"response": "Did not capture any text please position camera properly on a text"}
        if text:
            try:
                my_request = requests.post(url="https://jbotrex.pythonanywhere.com/query", json={"data": text},timeout=5)
                my_request.raise_for_status()
                response = my_request.json()
                title = text[:10]
                content = response['response']
                current_user_email = g.get('current_user')['sub']
                query_read = f"SELECT * FROM users WHERE email='{current_user_email}';"
                db_user = return_query(query_read, False)
                db_user_id = db_user[0]
                date_created = datetime.utcnow()
                query = f"INSERT INTO chats(title,content,user_chats,date_created) VALUES('{title}','{content}','{db_user_id}','{date_created}')"
                write_query(query)
            except requests.Timeout:
                print('Request timed out')
                response = {'error': True}
            except requests.RequestException as e:
                print(f'Request error: {e}')
                response = {'error': True}
            except Exception as e:
                response = {'error': True}
                print(e)
        else:
            response = {'error': True}
            # response = {"response": text}
        return response


@app.post("/camera")
@cross_origin()
def chat():
    response = ''
    data = request.get_data()
    if data:
        name = random.randint(0, 1000)
        path = os.path.join("static/uploads", secure_filename(str(name)))
        image_name = f'{path}.png'
        image = Base64ToImage(image_name, data)
        text0 = convert_image_to_text(image_name)
        text = text0.replace("\f", '')
        print(len(text))
        check_length = len(text) - 2
        match check_length:
            case 0:
                text = ''
                response = {"response": "invalid"}
            case _:
                with open("ultimate.txt", "w", encoding="utf-8") as f:
                    f.write(text)
                os.remove(image_name)
                print(f'{len(text)}')
                print(text)
                try:
                    my_request = requests.post(url="https://jbotrex.pythonanywhere.com/query", json={"data": text},
                                               timeout=5)

                    my_request.raise_for_status()  # Check for HTTP errors
                    response = my_request.json()
                    pdf_converter(response["response"])
                    title = text[:10]
                    content = response['response']
                    current_user_email = g.get('current_user')['sub']
                    query_read = f"SELECT * FROM users WHERE email='{current_user_email}';"
                    db_user = return_query(query_read, False)
                    db_user_id = db_user[0]
                    date_created = datetime.utcnow()
                    query = f"INSERT INTO chats(title,content,user_chats,date_created) VALUES('{title}','{content}','{db_user_id}','{date_created}')"
                    write_query(query)
                # Process the response
                except requests.Timeout:
                    # Handle timeout error
                    print('Request timed out')

                except requests.RequestException as e:
                    # Handle other request-related errors
                    print(f'Request error: {e}')
                except Exception as e:
                    print(e)

    elif data == "":
        response = {"response": "invalid"}

    return response


@app.route("/pdf")
def download_pdf():
    path = Path(f'./static/ThePDF/downloads.txt')
    return send_file(path, as_attachment=True)


@app.route('/history')
def history():
    user_email= g.get('current_user')['sub']
    return render_template('history.html',user_email=user_email)


@app.route('/history_query')
def history_query():
    current_user_email = g.get('current_user')['sub']
    query_read = f"SELECT * FROM users WHERE email='{current_user_email}';"
    db_user = return_query(query_read, False)
    db_user_id = db_user[0]
    query = f"SELECT * FROM chats WHERE user_chats='{db_user_id}'"
    history_query = return_query(query, True)
    return {'data': history_query}


@app.errorhandler(500)
def server_error(e):
    return render_template('500.html'), 500


if __name__ == "__main__":
    app.run(debug=True)
