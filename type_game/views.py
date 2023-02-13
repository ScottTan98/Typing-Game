import random
from django.shortcuts import render
from django.shortcuts import HttpResponse
from django.http import HttpResponseRedirect, JsonResponse, HttpResponseBadRequest
from django.urls import reverse
from .models import Content

# Create your views here.

def index(request):
    total_content = Content.objects.all().count()
    random_num = random.randint(1, total_content)
    random_content = Content.objects.get(pk=random_num)
    return render(request, "type_game/index.html", {
        "content" : random_content
    })


def reset(request): 
    if request.method == "GET":
        return HttpResponseRedirect(reverse("index")) 