# coding:utf-8
from django.core.exceptions import ObjectDoesNotExist
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from forms import *
from util import *

reload(sys)
sys.setdefaultencoding('utf8')


def weixinCallBack(request):
    if request.method == 'POST':
        xml = request.body
        mtrade_status = (read_xml(xml, "return_code"))

        if (mtrade_status == 'SUCCESS'):
            mOrder = Order.objects.get(id=(read_xml(xml, "attach")))
            mOrder.orderState = 1
            mOrder.save()

        return HttpResponse(
            "<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>")


def help(request):
    return render(request, 'userManagement/help.html')


def indexShow(request):
    articleCategorys = ArticleCategory.objects.all()[:4]
    # TODO 硬编码此处
    # articles = get_object_or_404(ArticleCategory, url="xcx").article_set.all()
    return render(request, 'userManagement/indexshow.html', {"articleCategorys": articleCategorys})


def phone(request):
    if request.method == "POST":
        Phone.objects.create(phone=request.POST.get("phone"))
        return HttpResponse("ok", status=201)


def phoneCall(request):
    if request.method == "GET":
        # Phone.objects.filter()
        list = []
        list.append({"name": "da", "phone": "18888"})
        return render(request, 'userManagement/callPhoneManagement.html', {"data": list})
    if request.method == "POST":
        id = request.POST.get("id")
        name = request.POST.get("name", "")
        occupation = request.POST.get("occupation", "")
        location = request.POST.get('location', "")
        remarks = request.POST.get("remarks", "")
        nextCall = request.POST.get("nextCall", "")
        phone = get_object_or_404(Phone, id=id)

        phone.name = name
        phone.occupation = occupation
        phone.location = location
        phone.remarks = remarks
        phone.save()
        return HttpResponseRedirect('/phone/')


def article(request, category, id):
    # TODO 此处可优化到html中
    if request.method == "GET":
        allCategory = ArticleCategory.objects.all()
        article = get_object_or_404(Article, id=id)
        articleCategoryList = ArticleCategory.objects.filter(url=category)
        categoryName = ""
        if articleCategoryList.count() == 1:
            categoryName = articleCategoryList[0].name

        try:
            next = article.get_next_by_modDateTime()
        except ObjectDoesNotExist:
            next = None
        try:
            previous = article.get_previous_by_modDateTime()
        except ObjectDoesNotExist:
            previous = None

        return render(request, 'userManagement/article.html',
                      {"article": article, "category": category, "categoryName": categoryName,
                       "allCategory": allCategory, "next": next, "previous": previous})


def category(request, category):
    if request.method == "GET":
        categoryobjs = get_object_or_404(ArticleCategory, url=category).article_set.all()
        paginator = Paginator(categoryobjs, 8)
        page = request.GET.get('page', 1)
        allCategory = ArticleCategory.objects.all()
        try:
            # a = request.user.groups.all()[0].id
            contacts = paginator.page(page)
        except PageNotAnInteger:
            # If page is not an integer, deliver first page.
            contacts = paginator.page(1)
        except EmptyPage:
            # If page is out of range (e.g. 9999), deliver last page of results.
            contacts = paginator.page(paginator.num_pages)
        return render(request, 'userManagement/article.html',
                      {"Len": paginator.num_pages, "categoryobjs": contacts, "category": category,
                       "allCategory": allCategory})
