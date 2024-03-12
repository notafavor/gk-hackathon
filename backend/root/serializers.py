from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length=5)
    email = serializers.EmailField(
                required=True,
                validators=[UniqueValidator(queryset=get_user_model().objects.all())]
                )

    def create(self, validated_data):
            user = get_user_model().objects.create_user(validated_data['username'], validated_data['email'],
                validated_data['password'])
            return user

    class Meta:
        model = get_user_model()
        fields = ["id", "url", "username", "email", "password"]