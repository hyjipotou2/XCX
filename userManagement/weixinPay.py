# coding:utf-8
import md5
import time
import urllib2
import urllib
from xml.etree import ElementTree
from random import Random,randint

import requests
from django.core.exceptions import ValidationError


def trans_xml_to_dict(xml):
    """
    将微信支付交互返回的 XML 格式数据转化为 Python Dict 对象

    :param xml: 原始 XML 格式数据
    :return: dict 对象
    """

    xml = ElementTree.fromstring(xml)

    if not xml:
        return {}

    # 将 XML 数据转化为 Dict
    data = dict([(item.tag, item.text) for item in xml])
    return data


def trans_dict_to_xml(data):
    """
    将 dict 对象转换成微信支付交互所需的 XML 格式数据

    :param data: dict 对象
    :return: xml 格式数据
    """

    xml = []
    for k in sorted(data.keys()):
        v = data.get(k)
        if k == 'detail' and not v.startswith('<![CDATA['):
            v = '<![CDATA[{}]]>'.format(v)
        xml.append('<{key}>{value}</{key}>'.format(key=k, value=v))
    return '<xml>{}</xml>'.format(''.join(xml))

def out_trade_no():
    str=int(time.time()).__str__()
    str=str+(randint(1000, 9999).__str__())
    return str




def random_str(randomlength=8):
    str = ''
    chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'
    length = len(chars) - 1
    random = Random()
    for i in range(randomlength):
        str += chars[random.randint(0, length)]
    return str


def read_xml(text, findname):
    root = ElementTree.fromstring(text)

    node_find = root.find(findname)
    return (node_find.text)



APPID = 'wx29864f0ce19857ed'
PARTNERID = '1365812202'
KEY = '1365812202'



class MyweixinClass(object):
    '''
    classdocs
    '''

    def __init__(self, mOrder, ip,openid,appid=APPID,mch_id=PARTNERID,key=KEY):
        '''
        Constructor
        '''
        self.timestamp = str(time.time())
        self.mOrder = mOrder
        self.ip = ip
        self.appid=APPID
        self.mch_id=mch_id
        self.openid=openid
        self.key=key
        self.nonce_str=random_str()
        self.out_trade_no=out_trade_no()
    def getsignDict(self):
        signDict={"appid":self.appid,
                  "mch_id": self.mch_id,
                  "attach":self.mOrder.id,
                  "body":"goods-goods",
                  "nonce_str":self.nonce_str,
                  "notify_url":"https://xcx.yibangbang99.com/weixincallback/",
                  "openid":self.openid,
                  "out_trade_no":self.out_trade_no,
                  "spbill_create_ip":self.ip,
                  "total_fee":str(self.mOrder.totalPrice*100),
                  "trade_type":"JSAPI"

                 }
        return signDict


    def initXml(self):
        return trans_dict_to_xml(self.getsignDict())


    def mMd5(self, dict):
        mstring=''
        keys = dict.keys()  # 方法二

        keys.sort()


        for key in keys:
            if mstring=='':
                mstring=key+'='+str(dict[key])
            else:
                mstring=mstring+"&"+key+'='+str(dict[key])
        mstring = mstring + "&key=" + str(self.key)
        print mstring
        mi = mstring
        m = md5.new()

        m.update(mi)

        return m.hexdigest().upper()
    def md5Xml(self):

        signDict=self.getsignDict()
        signDict["sign"] = self.mMd5(self.getsignDict())
        return trans_dict_to_xml(signDict)
    def getprepat_id(self,xml):
        r=requests.post("https://api.mch.weixin.qq.com/pay/unifiedorder",data=xml)
        content=r.content
        if (read_xml(content, 'return_msg') == 'OK'):
            self.mpostToWexin = read_xml(content, 'prepay_id')
            return self.mpostToWexin
        else:
            raise ValidationError("bad request",400)
    def getxcxDict(self):


        signDict={"appid":self.appid,
                  "nonce_str":self.nonce_str,
                   "timeStamp":self.timestamp,
                  "package":"prepay_id="+self.getprepat_id(self.md5Xml()),
                  "signType":"MD5",

                 }
        return signDict
    def getxcxMD5Dict(self):
        signDict=self.getxcxDict()
        signDict["paySign"]=self.mMd5(signDict)
        return signDict



