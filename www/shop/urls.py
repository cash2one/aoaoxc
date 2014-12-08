# -*- coding: utf-8 -*-

from django.conf.urls import patterns, include, url
from django.conf import settings
from django.views.generic.simple import direct_to_template

urlpatterns = patterns('www.shop.views',
                       url(r'^$', 'shop_index'),
                       url(r'^(?P<car_wash_id>\d+)/verify_code$', 'verify_code'),
                       url(r'^orders$', 'orders'),
                       url(r'^chart$', 'chart'),
                       )
