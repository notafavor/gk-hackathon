from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from api import views
from .views import RegistrationAPIView, LoginAPIView, LogoutAPIView


router = routers.DefaultRouter()
router.register(r"users", views.UserViewSet)
router.register(r"recognitions", views.RecognitionViewSet)
router.register(r"files", views.FileViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include(router.urls)),
    path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/register/', RegistrationAPIView.as_view(), name='user_register'),
    path('api/v1/auth/', LoginAPIView.as_view(), name='user_login'),
    path('api/v1/logout/', LogoutAPIView.as_view(), name='user_logout'),
    path('api/v1/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path("api-auth/", include("rest_framework.urls"))
]
