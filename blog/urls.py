from django.conf.urls import url
from . import views

urlpatterns = [
 url(r'^$', views.blog_home, name="blog_home"),
 url(r'^blog/list$', views.blog_list, name="blog_list"),
 url(r'^blog/(?P<pk>\d+)/$', views.blog_detail, name="blog_detail"),
 url(r'^blog/(?P<pk>\d+)/edit$', views.blog_edit, name="blog_edit"),
 url(r'^blog/new$', views.blog_new, name="blog_new"),
 url(r'^blog/game$', views.blog_game, name="blog_game"),
 url(r'^blog/timer', views.blog_timer, name="blog_timer"),
 url(r'^blog/canvas$', views.blog_canvas, name="blog_canvas"),
 url(r'^blog/image', views.blog_image, name="blog_image"),
 url(r'^blog/(?P<pk>\d+)/remove', views.blog_remove, name="blog_remove"),
]