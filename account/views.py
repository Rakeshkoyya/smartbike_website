from . import db
from account.forms import RegistrationForm, AccountAuthenticationForm
from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.http import Http404

from django.contrib.auth import get_user_model
User = get_user_model()

# from blog.models import BlogPost


def index(request):
    return render(request, 'index.html')


@login_required(login_url='login')
def home(request):
    content = {}
    uid = request.user.uniqueID
    command = db.get_data(uid)
    # print('this is the command', command)
    if command == '1-0':
        content['command'] = ''
    elif command == '1-1':
        content['command'] = 'checked'

    content['user'] = User.objects.get(uniqueID=uid)

    return render(request, 'home.html', content)


@login_required(login_url='login')
def maps(request):
    return render(request, 'maps.html')


@login_required(login_url='login')
def admin_home(request):
    if not request.user.is_admin:
        raise Http404
    User = get_user_model()
    users = list(User.objects.all())
    # print(users)
    return render(request, 'admin_home.html', {'us': users})


def registration_view(request):
    if not request.user.is_admin:
        raise Http404
    context = {}
    if request.POST:
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            uniqueID = form.cleaned_data.get('uniqueID')
            # raw_password = form.cleaned_data.get('password1')
            # account = authenticate(uniqueID=uniqueID, password=raw_password)
            # create_usertable(uniqueID)
            # login(request, account)
            db.create_user_data(uniqueID)

            return redirect('admin_home')
        else:
            context['registration_form'] = form

    else:
        form = RegistrationForm()
        context['registration_form'] = form
    return render(request, 'account/register.html', context)


def logout_view(request):
    logout(request)
    return redirect('index')


def login_view(request):

    context = {}

    user = request.user
    if user.is_authenticated:
        if user.is_admin:
            return redirect('admin_home')
        return redirect("home")

    if request.POST:
        form = AccountAuthenticationForm(request.POST)
        if form.is_valid():
            uniqueID = request.POST['uniqueID']
            password = request.POST['password']
            user = authenticate(uniqueID=uniqueID, password=password)

            if user.is_superuser:

                login(request, user)
                return redirect("admin_home")

            if user:
                login(request, user)
                return redirect("home")

    else:
        form = AccountAuthenticationForm()

    context['form'] = form

    # print(form)
    return render(request, "account/login.html", context)


# def account_view(request):

#     if not request.user.is_authenticated:
#         return redirect("login")

#     context = {}
#     if request.POST:
#         form = AccountUpdateForm(request.POST, instance=request.user)
#         if form.is_valid():
#             form.initial = {
#                 "email": request.POST['email'],
#                 "username": request.POST['username'],
#             }
#             form.save()
#             context['success_message'] = "Updated"
#     else:
#         form = AccountUpdateForm(

#             initial={
#                 "email": request.user.email,
#                 "username": request.user.username,
#             }
#         )

#     context['account_form'] = form

#     blog_posts = BlogPost.objects.filter(author=request.user)
#     context['blog_posts'] = blog_posts

#     return render(request, "account/account.html", context)


# def must_authenticate_view(request):
#     return render(request, 'account/must_authenticate.html', {})
