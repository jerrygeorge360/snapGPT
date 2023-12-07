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

# def authentication():
#
#
# if __name__ == "__main__":
#     token = encoder(payload={'sub': 'edeani', "iat": 1516239022}, key='ultimate')
#
#
#     def decode_token(token, key, algorithm='HS256'):
#         try:
#             decoded_payload = jwt.decode(token, key, algorithms=[algorithm])
#             return decoded_payload
#         except jwt.ExpiredSignatureError:
#             return {'error': 'Token has expired'}
#         except jwt.InvalidTokenError:
#             return {'error': 'Invalid token'}
#
#

#     # token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsInR5cGUiOiJKV1QifQ' \
#     #       '.eyJzdWIiOiJlZGVhbmlnb2Rzd2lsbGl6dUBnbWFpbC5jb20iLCJleHAiOm51bGx9.2zfLMHruedC9m3tOEnmMSq7grhWX7Ij' \
#     #       '-MlkvkFGtiaU '
#     # print(type(token))
#     # print(decoder(token, 'ultimate',algorithm='HS256'))
