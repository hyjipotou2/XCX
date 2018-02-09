from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404

from userManagement.forms import QuestionForm
from userManagement.models import Applet, QuestionAppData


def question(request):
    if request.method == 'GET':
        id = request.GET.get("id", 1)
        applet = Applet.objects.get(id=id)
        formHtml = ""
        if hasattr(applet, "questionappdata"):

            formHtml = QuestionForm(instance=applet.questionappdata).as_ul()
        else:
            formHtml = QuestionForm().as_ul()
        return render(request, 'userManagement/questionManagement.html', {"form": formHtml, "id": id})
    if request.method == 'POST':
        id = request.GET.get("id")
        applet = get_object_or_404(Applet, id=id)
        form = QuestionForm(request.POST, request.FILES)
        if form.is_valid():

            if (hasattr(applet, "questionappdata")):
                form = QuestionForm(request.POST, request.FILES, instance=applet)
                form.save()

                return HttpResponseRedirect("/question/?id=" + id)

            else:
                QuestionAppData.objects.create(applet=applet,
                                               **form.cleaned_data)
                return HttpResponseRedirect("/question/?id=" + id)
        else:
            return render(request, 'userManagement/questionManagement.html', {"form": form.as_ul(), "id": id})