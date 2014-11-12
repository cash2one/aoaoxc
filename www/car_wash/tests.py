# -*- coding: utf-8 -*-

import os
import sys

SITE_ROOT = os.path.dirname(os.path.abspath(__file__))
# 引入父目录来引入其他模块
sys.path.extend([os.path.abspath(os.path.join(SITE_ROOT, '../')),
                 os.path.abspath(os.path.join(SITE_ROOT, '../../')),
                 ])
os.environ['DJANGO_SETTINGS_MODULE'] = 'www.settings'

from www.car_wash import interface


def main():
    stb = interface.ServiceTypeBase()
    # print stb.add_service_type(name=u"标准洗车(5座)")
    print stb.modify_service_type(1, u"标准洗车(5座)")

if __name__ == '__main__':
    main()
