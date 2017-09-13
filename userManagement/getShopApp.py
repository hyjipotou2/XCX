# coding=utf-8
import json
import os

from XCX.settings import BASE_DIR


class Xcx():


    def __init__(self, id, name, appDescription, imageurl):

        self.name = str(name)
        self.appDescription = str(appDescription)
        self.imageurl = str(imageurl)
        self.id = str(id)

        self.appPath = os.path.join(BASE_DIR, "media", "app")
        self.xcxApps = os.path.join(BASE_DIR, "xcxApps")

        self.createFile()
        self.setData()

    def createFile(self):

        if ((os.path.isdir(os.path.join(self.appPath, self.id))) == False):
            os.system("mkdir -p " + os.path.join(self.appPath, self.id))
        os.system("cp -R -f " + os.path.join(self.xcxApps, "*") + " " + os.path.join(self.appPath, self.id))

    def setData(self):
        op = 'sed -i "s/appId:\'\'/appId:\'%s\'/;' \
             's/appTitle:\'\'/appTitle:\'%s\'/;' \
             's/appDescription:\'\'/appDescription:\'%s\'/;' \
             's/appLogo:\'\'/appLogo:\'%s\'/"%s' \
             % (self.id, self.name, self.appDescription, self.httpstring(self.imageurl),
                " " + os.path.join(self.appPath, self.id, "XcxShopApp", "app.js"))
        os.system(op)

    def createZip(self):

        os.system(
            "cd %s&&zip -rq %s.zip %s &&mv %s.zip %s" % (self.appPath,self.id, self.id, self.id, self.appPath))

    def removeTemp(self):
        os.system("rm -rf " + os.path.join(self.appPath, self.id))
        # os.system("rm -rf ../media/app/%s.zip" % (self.id))

    def getZipUrl(self):
        if (os._exists(os.path.join(self.appPath, self.id + ".zip")) == False):
            self.createZip()
        return "/media/app/%s.zip" % (self.id)

    def clean(self):
        pass
    def httpstring(self,string):
        return string.replace("/", "\/")
        # TODO clean not finsh
