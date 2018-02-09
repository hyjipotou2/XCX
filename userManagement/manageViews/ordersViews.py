from django.contrib.auth.decorators import login_required
from django.shortcuts import render


@login_required
def orders(request):
    if request.method == 'GET':
        id = request.GET.get("id", 1)

        return render(request, 'userManagement/ordersManagement.html', {"id": id})