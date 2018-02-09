# coding:utf-8
import json

from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, render

from userManagement.forms import AddGoodsForm
from userManagement.models import Applet, Goods, GoodsImage
from userManagement.rest import serializers


@login_required
def goods(request):
    if request.method == 'GET':
        id = request.GET.get("id", 1)
        goods_set = get_object_or_404(Applet, id=id).goods_set

        List = json.dumps(serializers.GoodsSerializer(goods_set, many=True, context={'request': request}).data)

        # FormSet = inlineformset_factory(Goods, GoodsImage, extra=2,fields="__all__",fk_name="goodsImageForeignKey")
        # return HttpResponse(FormSet(instance=Goods.objects.all()[0]))

        return render(request, 'userManagement/goodsManagement.html',
                      {'List': List, "AddGoodsForm": AddGoodsForm, "id": id})


def getGoodsForm(request):
    if request.method == 'GET':
        id = request.GET.get("id", 1)
        goods = get_object_or_404(Goods, id=id)

        formHtml = AddGoodsForm(instance=goods).as_ul()

        images = goods.goodsimage_set.all()
        imageHtml = ""
        for i in images:
            imageHtml = imageHtml + u'''


        <span class="broadcast-img-list" data-id="%s"><a class="thumbnail" href="javascript:;"><img class="field-img"
                                                                                       src="%s"></a><span
                class="broadcast-img-dele">×</span></span>
        ''' % (i.id, "http://" + request.get_host() + i.image.url)

        ulHtml = u'''<li id="images">
        %s
        <div class="file-input">
            <p class="input-container">
                上传图片
                <input type="file" id="upload" accept="image/*" multiple>
            </p>

        </div>
    </li>

        ''' % (imageHtml,)

        formHtml = formHtml + ulHtml
        print formHtml

        return HttpResponse(formHtml)


def imageUpApi(request):
    if request.method == 'POST':
        outList = []
        for file in request.FILES.values():
            # file_obj = request.FILES.get('file', None)

            outDict = {}

            goodsImage = GoodsImage.objects.create(image=file)

            outDict['id'] = goodsImage.id
            outDict['image'] = "http://" + request.get_host() + goodsImage.image.url
            outList.append(outDict)

        return JsonResponse(outList, safe=False)