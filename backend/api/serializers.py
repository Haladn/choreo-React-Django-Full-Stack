from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

# coverting python objects to JSON and vise versa
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = ['id','username','password']

    # just want to create the password and we can's see 
    #the password when quring user
        extra_kwargs={'password':{'write_only':True}}

    # override create funtion to hash our password
    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
        )

        # hashing our password with set_password function
        user.set_password(validated_data['password'])
        user.save()
        return user

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model= Note
        fields = ['id','title','content','created_at','author']
        extra_kwargs = {"author":{"read_only":True}}