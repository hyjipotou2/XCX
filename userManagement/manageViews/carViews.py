# coding:utf-8
import json

from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render

from userManagement.forms import CarsForm, CarAppForm
from userManagement.models import Applet, Cars, CarAppData
from userManagement.rest import serializers
from userManagement.rest.viewSet import CarsViewSet
from userManagement.manageViews.goodViews import goods


@login_required
def cars(request):
    if request.method == 'GET':
        id = request.GET.get("id", 1)
        cars_set = get_object_or_404(Applet, id=id).cars_set

        List = json.dumps(serializers.CarsSerializer(cars_set, many=True, context={'request': request}).data)

        # FormSet = inlineformset_factory(Goods, GoodsImage, extra=2,fields="__all__",fk_name="goodsImageForeignKey")
        # return HttpResponse(FormSet(instance=Goods.objects.all()[0]))

        return render(request, 'userManagement/carsManagement.html', {'List': List, "AddGoodsForm": CarsForm, "id": id})


def getCarForm(request):
    if request.method == 'GET':
        id = request.GET.get("id", 1)
        car = get_object_or_404(Cars, id=id)

        formHtml = CarsForm(instance=goods).as_ul()
        return formHtml


def carsapp(request):
    if request.method == 'GET':
        id = request.GET.get("id", 1)
        applet = Applet.objects.get(id=id)
        formHtml = ""
        if hasattr(applet, "carappdata"):

            formHtml = CarAppForm(instance=applet.carappdata).as_ul()
        else:
            formHtml = CarAppForm().as_ul()
        return render(request, 'userManagement/carsAppletManagement.html', {"form": formHtml, "id": id})
    if request.method == 'POST':
        id = request.GET.get("id")
        applet = get_object_or_404(Applet, id=id)
        form = CarAppForm(request.POST, request.FILES)
        if form.is_valid():

            if (hasattr(applet, "carappdata")):
                form = CarAppData(request.POST, request.FILES, instance=applet)
                form.save()

                return HttpResponseRedirect("/carsapp/?id=" + id)

            else:
                CarsViewSet.objects.create(applet=applet,
                                           **form.cleaned_data)
                return HttpResponseRedirect("/carsapp/?id=" + id)
        else:
            return render(request, 'userManagement/carsAppletManagement.html', {"form": form.as_ul(), "id": id})