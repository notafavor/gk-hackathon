from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from api import views
from .views import RegistrationAPIView, LoginAPIView


router = routers.DefaultRouter()
router.register(r"users", views.UserViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include(router.urls)),
    path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/v1/token/logout/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/register/', RegistrationAPIView.as_view(), name='user_register'),
    path('api/v1/auth/', LoginAPIView.as_view(), name='user_register'),
]
