import datetime

import jwt


def encoder(payload, key):
    header = {'type': 'JWT', 'alg': 'HS256'}

    encoded = jwt.encode(headers=header, payload=payload, key=key)
    return encoded



def decoder(token, key, algorithm):

    # if decoded:

    try:
        decoded = jwt.decode(jwt=token, key=key, algorithms=algorithm, verify=True)
        if datetime.datetime.utcnow() >= datetime.datetime.utcfromtimestamp(decoded["exp"]):
            raise jwt.ExpiredSignatureError('Token has expired')
        return decoded
    except jwt.ExpiredSignatureError as expired_error:
        print(f'Token expired: {expired_error}')
        return {'error': 'Token has expired','expirationTime':datetime.datetime.utcnow()-datetime.timedelta(minutes=10)}, 401
    except jwt.InvalidTokenError as invalid_token_error:
        print(f'Invalid token: {invalid_token_error}')
        return {'error': 'Invalid token'}, 401
    except Exception as err:
        print(f'Error decoding token: {err}')

