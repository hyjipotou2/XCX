from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, mixins
from userManagement.models import *
import serializers
from userManagement.models import Applet, QuestionAppData, CarAppData, Cars


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


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = serializers.UserSerializer

class AddressViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    def get_queryset(self):
        queryset = Address.objects.all()

        session_key = self.request.query_params.get("session_key")
        if session_key is not None:
            appletUser = get_or_permissionDenied(AppletUser, xcxSession=session_key)
            queryset = queryset.filter(appletUserForeign=appletUser)

        return queryset

    queryset = Address.objects.all()
    serializer_class = serializers.AddressSerializer


class ShowViewSet(viewsets.ReadOnlyModelViewSet):
    def get_queryset(self):
        queryset = ShowAppData.objects.all()

        app_id = self.request.query_params.get("_app_id")
        if app_id is not None:
            applet = get_object_or_404(Applet, id=app_id)
            queryset = queryset.filter(applet=applet)

        return queryset

    serializer_class = serializers.ShowSerializers
    queryset = ShowAppData.objects.all()


class OrderViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,

                   mixins.ListModelMixin, ):
    def get_queryset(self):
        queryset = Order.objects.all().order_by("-createDateTime")

        session_key = self.request.query_params.get("session_key")
        if session_key is not None:
            appletUser = get_or_permissionDenied(AppletUser, xcxSession=session_key)
            queryset = queryset.filter(userForeignKey=appletUser)

        appletid = self.request.query_params.get("applet")
        if appletid:

            applet = Applet.objects.get(id=appletid)

            q = None
            for i in applet.appletuser_set.all():
                if (q):
                    q = q | Q(userForeignKey=i)
                else:
                    q = Q(userForeignKey=i)

            queryset = queryset.filter(q)

        state = self.request.query_params.get("state", None)
        if state:
            queryset = queryset.filter(orderState=state)

        return queryset

    serializer_class = serializers.OrderSerializers
    queryset = Order.objects.all()


class AppletViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin,
                    mixins.DestroyModelMixin, mixins.UpdateModelMixin):
    serializer_class = serializers.AppletSerializer
    queryset = Applet.objects.all()


class QuestionViewSet(viewsets.ReadOnlyModelViewSet):
    def get_queryset(self):
        queryset = QuestionAppData.objects.all()

        app_id = self.request.query_params.get("_app_id")
        if app_id is not None:
            applet = get_object_or_404(Applet, id=app_id)
            queryset = queryset.filter(applet=applet)

        return queryset

    serializer_class = serializers.QuestionSerializers
    queryset = QuestionAppData.objects.all()


class CarsAppViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        queryset = CarAppData.objects.all()

        app_id = self.request.query_params.get("_app_id")
        if app_id is not None:
            applet = get_object_or_404(Applet, id=app_id)
            queryset = queryset.filter(applet=applet)
        index = self.request.query_params.get("index")
        if (index is not None):
            if (index == "up"):
                queryset = queryset.order_by("price")
            if (index == "down"):
                queryset = queryset.order_by("-price")

        return queryset

    serializer_class = serializers.CarSerializer
    queryset = CarAppData.objects.all()


class CarsViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        queryset = Cars.objects.all()

        app_id = self.request.query_params.get("_app_id")
        if app_id is not None:
            applet = get_object_or_404(Applet, id=app_id)
            queryset = queryset.filter(applet=applet)

        return queryset

    serializer_class = serializers.CarsSerializer
    queryset = Cars.objects.all()