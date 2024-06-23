from django.shortcuts import render
from .serializers import UserSerializer , NoteSerializer
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note



# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes=[AllowAny]



class NoteListCreate(generics.ListCreateAPIView): #This is list and create new note
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]  # just authenticated user

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author = user)  # filter notes to the current user
    
    def perform_create(self, serializer):
        if serializer.is_valid():  # check validation
            serializer.save(author = self.request.user) # adding the user manually because
                                                        # we set it to only read in serializer model
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class=Note
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author = user)