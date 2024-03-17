from chat import consumers
from django.conf import settings
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.static import serve
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from api import views
from .views import RegistrationAPIView, LoginAPIView, LogoutAPIView
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView


router = routers.DefaultRouter()
router.register(r"users", views.UserViewSet)
router.register(r"recognitions", views.RecognitionViewSet)
router.register(r"files", views.FileViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include(router.urls)),
    path("api/v1/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/v1/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/v1/register/", RegistrationAPIView.as_view(), name="user_register"),
    path("api/v1/auth/", LoginAPIView.as_view(), name="user_login"),
    path("api/v1/logout/", LogoutAPIView.as_view(), name="user_logout"),
    path("api/v1/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("api/v1/send_message/", views.SendMessageView.as_view(), name="send_message"),
    path("api-auth/", include("rest_framework.urls")),
]

if settings.IS_DEVELOP:
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    urlpatterns += staticfiles_urlpatterns()

# swagger/redoc
urlpatterns += [
    path("api/v1/schema/", SpectacularAPIView.as_view(api_version="v1"), name="schema"),
    path("api/v1/schema/swagger-ui/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/v1/schema/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
]

# asgi urls
websocket_urlpatterns = [
    re_path(r"chat/recognition/(?P<recognition_id>\w+)/$", consumers.ChatConsumer.as_asgi()),
]
