#coding=utf-8

from django.shortcuts import render_to_response,render,get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect,JsonResponse
from django.contrib.auth.models import User
from django.contrib import auth
from django.contrib import messages
from django.template.context import RequestContext
from django_filters.rest_framework import DjangoFilterBackend

from userManagement.models import *
from XCX import settings
from django.forms.formsets import formset_factory
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
import django.contrib.auth
from bootstrap_toolkit.widgets import BootstrapUneditableInput

from django.contrib.auth.models import User, Group
from rest_framework import viewsets
import serializers
import json
from django.shortcuts import render_to_response
from forms import *
from django.contrib.auth.decorators import login_required







def login(request):
    if request.method == 'GET':

        form = LoginForm()
        return render_to_response('userManagement/login.html', RequestContext(request, {'form':form, }))
    else:
        form = LoginForm(request.POST)
        if form.is_valid():
            username = request.POST.get('username','')
            password = request.POST.get('password','')
            user = auth.authenticate(username=username,password=password)
            if user is not None and user.is_active:
                auth.login(request,user)

                return HttpResponseRedirect(request.GET.get("next_to",'/index/'))

            else:
                return render_to_response('userManagement/login.html', RequestContext(request, {'form':form, 'password_is_wrong':True}))
        else:
            return render_to_response('userManagement/login.html', RequestContext(request, {'form':form, }))

class GoodsViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    def get_queryset(self):
        queryset = Goods.objects.all()

        appletid = self.request.query_params.get("applet")
        if appletid is not None:

            queryset = queryset.filter(applet=appletid)
        return queryset


    queryset = Goods.objects.all()

    serializer_class = serializers.GoodsSerializer

@login_required
def goods(request):
    if request.method == 'GET':
        id=request.GET.get("id",1)

        goods_set=get_object_or_404(Applet,id=id).goods_set



        List=json.dumps(serializers.GoodsSerializer(goods_set, many=True, context={'request': request}).data)

        #FormSet = inlineformset_factory(Goods, GoodsImage, extra=2,fields="__all__",fk_name="goodsImageForeignKey")
        #return HttpResponse(FormSet(instance=Goods.objects.all()[0]))

        return render(request,'userManagement/goodsManagement.html',{'List':List,"AddGoodsForm":AddGoodsForm})

@login_required
def orders(request):
    if request.method == 'GET':
        id = request.GET.get("id", 1)

        goods_set = get_object_or_404(Applet, id=id).goods_set

        List = json.dumps(serializers.GoodsSerializer(goods_set, many=True, context={'request': request}).data)

        # FormSet = inlineformset_factory(Goods, GoodsImage, extra=2,fields="__all__",fk_name="goodsImageForeignKey")
        # return HttpResponse(FormSet(instance=Goods.objects.all()[0]))

        return render(request, 'userManagement/goodsManagement.html', {'List': List, "AddGoodsForm": AddGoodsForm})


def getForm(request):
    if request.method == 'GET':
        id = request.GET.get("id", 1)
        goods=get_object_or_404(Goods,id=id)

        formHtml=AddGoodsForm(instance=goods).as_ul()
        print formHtml

        images=goods.goodsimage_set.all()
        imageHtml=""
        for i in images:
            imageHtml=imageHtml+u'''


        <span class="broadcast-img-list" data-id="%s"><a class="thumbnail" href="javascript:;"><img class="field-img"
                                                                                       src="%s"></a><span
                class="broadcast-img-dele">×</span></span>
        '''%(i.id,"http://"+request.get_host()+i.image.url)



        ulHtml=u'''<li id="images">
        %s
        <div class="file-input">
            <p class="input-container">
                上传图片
                <input type="file" id="upload" accept="image/*" multiple>
            </p>

        </div>
    </li>

        '''%(imageHtml,)




        formHtml=formHtml+ulHtml
        print formHtml

        return HttpResponse(formHtml)







class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """



    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = serializers.UserSerializer

class OrderViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Order.objects.all()
    serializer_class=serializers.OrderSerializers

def imageUpApi(request):

    if request.method == 'POST':
        outList=[]
        for file in request.FILES.values():
            #file_obj = request.FILES.get('file', None)


            outDict={}


            goodsImage=GoodsImage.objects.create(image=file)

            outDict['id']=goodsImage.id
            outDict['image']="http://"+request.get_host()+goodsImage.image.url
            outList.append(outDict)



        return JsonResponse(outList,safe=False)


class DisableCSRFCheck(object):
    def process_request(self, request):
        setattr(request, '_dont_enforce_csrf_checks', True)