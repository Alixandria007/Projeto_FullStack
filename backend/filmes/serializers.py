from rest_framework import serializers
from django.utils.text import slugify
from . import models

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Categoria
        fields = "__all__"

class AutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Autor
        fields = "__all__"

class FilmesSerializer(serializers.ModelSerializer):
    autor = AutorSerializer(read_only = True)
    categoria = CategoriaSerializer(many = True)
    slug = serializers.SlugField(read_only = True)
    

    class Meta:
        model = models.Filme
        fields = "__all__"

class FilmesSerializerPost(serializers.ModelSerializer):

    class Meta:
        model = models.Filme
        fields = "__all__"

    def create(self, validated_data):
        titulo = validated_data.get('titulo')
        slug = validated_data.get('slug')

        if not slug:  # Se a slug não estiver presente
            slug = slugify(titulo)  # Gera uma slug a partir do título

        slug = self._generate_unique_slug(slug)  # Chama a função para garantir unicidade
        validated_data['slug'] = slug  # Adiciona a slug gerada aos dados validados

        return super().create(validated_data)  # Chama o método create da classe pai

    def update(self, instance, validated_data):
        # Se você quiser permitir a atualização da slug, faça isso aqui
        titulo = validated_data.get('titulo', instance.titulo)
        slug = validated_data.get('slug', instance.slug)

        if not slug:  # Se a slug não estiver presente
            slug = slugify(titulo)

        slug = self._generate_unique_slug(slug, instance)  # Chama a função para garantir unicidade
        validated_data['slug'] = slug  # Adiciona a slug gerada aos dados validados

        return super().update(instance, validated_data)  # Chama o método update da classe pai

    def _generate_unique_slug(self, slug, instance=None):
        original_slug = slug
        counter = 1

        while self.Meta.model.objects.filter(slug=slug).exists() and (instance is None or slug != instance.slug):
            slug = f"{original_slug}-{counter}"
            counter += 1
        
        return slug

    