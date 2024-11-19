from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.views.generic import View

def index(request):
    return HttpResponse("Hello, world. You're at the app view.")

def home(request):
    return render(request, 'index.html')

class ShowHTML(View):
    template = loader.get_template(r"C:\GitHub\three_application\three_project\app\templates\index.html")
    def get(self, request):
        return render(request, self.template)