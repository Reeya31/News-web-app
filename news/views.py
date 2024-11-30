import requests
from django.shortcuts import render
from django.http import JsonResponse

API_KEY = "fcd94db9-bcc1-411e-961c-5c3843abb567"  

def index(request):
    return render(request, 'news/index.html')

def search_news(request):
    category = request.GET.get('category', 'general')
    location = request.GET.get('location', 'us')

    url = f"https://newsapi.ai/v2/top-headlines?country={location}&category={category}&apiKey={API_KEY}"

    response = requests.get(url)
    data = response.json()
    print(data)

    return JsonResponse(data)
