from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView
from .models import Autor, Editora, Livro
from .serializers import AutorSerializer, EditoraSerializer, LivroSerializer, RegisterSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.permissions import AllowAny, IsAuthenticated

from rest_framework_simplejwt.tokens import RefreshToken

# Filters
from .filters import AutorFilter 
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter



@api_view(['GET', 'POST'])
def listar_autores(request):
    if request.method == 'GET':
        queryset = Autor.objects.all()
        serializer = AutorSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = AutorSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
        
################################################     
class AutoresView(ListCreateAPIView):
    queryset = Autor.objects.all()
    serializer_class = AutorSerializer
    # permission_classes = [IsAuthenticated] 

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_field = ["id", "autor", "s_autor"]
    search_fields = ["autor", "s_autor"]
    filterset_class = AutorFilter
    
class AutoresDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Autor.objects.all()
    serializer_class = AutorSerializer
    permission_classes = [IsAuthenticated]
################################################
class EditorasView(ListCreateAPIView):
    queryset = Editora.objects.all()
    serializer_class = EditoraSerializer
    permission_classes = [IsAuthenticated]

class EditorasDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Editora.objects.all()
    serializer_class = EditoraSerializer
    permission_classes = [IsAuthenticated]

################################################

################################################
class LivrosView(ListCreateAPIView):
    queryset = Livro.objects.all()
    serializer_class = LivroSerializer
    permission_classes = [IsAuthenticated]


class LivrosDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Livro.objects.all()
    serializer_class = LivroSerializer
    permission_classes = [IsAuthenticated]

################################################
class RegisterView(ListCreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        ser = self.get_serializer(data=request.data)
        ser.is_valid(raise_exception=True)
        user = ser.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': {'id': user.id, 'username': user.username},
            'tokens': {'refresh': str(refresh), 'access': str(refresh.access_token)}
        }, status=status.HTTP_201_CREATED)




