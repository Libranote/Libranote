from django.conf.urls import url
from libranote.api.schools import views as school_views
from libranote.api.levels import views as level_views

urlpatterns = [
    url(r'^school/$', school_views.SchoolList.as_view()),
    url(r'^school/(?P<pk>[0-9]+)/$', school_views.SchoolDetail.as_view()),

    url(r'^level/$', level_views.LevelList.as_view()),
    url(r'^level/(?P<pk>[0-9]+)/$', level_views.LevelDetail.as_view())
]
