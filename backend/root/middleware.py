from django.conf import settings


def _get_scheme():
    return settings.HOST_PATH_SCHEME


def _get_raw_host():
    return settings.HOST_PATH_NETLOC


def get_port():
    return settings.HOST_PATH_PORT


class StaticHostPathMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response


    def __call__(self, request):
        request._get_scheme = _get_scheme
        request._get_raw_host = _get_raw_host
        request.get_port = get_port
        return self.get_response(request)
