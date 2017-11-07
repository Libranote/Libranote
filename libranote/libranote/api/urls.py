from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views as auth_views
from libranote.api.accounts.views import AccountViewSet
from libranote.api.classes import views as class_views
from libranote.api.courses import views as course_views
from libranote.api.homeworks import views as homework_views
from libranote.api.levels import views as level_views
from libranote.api.marks import views as mark_views
from libranote.api.schools import views as school_views
from libranote.api.students import views as student_views
from libranote.api.subjects import views as subject_views
from libranote.api.tests import views as test_views

router = DefaultRouter()
router.register(r'account', AccountViewSet)

urlpatterns = [
    url(r'^token-auth/', auth_views.obtain_auth_token),

    url(r'^', include(router.urls)),

    url(r'^class/$', class_views.ClassList.as_view()),
    url(r'^class/(?P<pk>[0-9]+)/$', class_views.ClassDetail.as_view()),

    url(r'^course/$', course_views.CourseList.as_view()),
    url(r'^course/(?P<pk>[0-9]+)/$', course_views.CourseDetail.as_view()),

    url(r'^homework/$', homework_views.HomeworkList.as_view()),
    url(r'^homework/(?P<pk>[0-9]+)/$', homework_views.HomeworkDetail.as_view()),

    url(r'^level/$', level_views.LevelList.as_view()),
    url(r'^level/(?P<pk>[0-9]+)/$', level_views.LevelDetail.as_view()),

    url(r'^mark/$', mark_views.MarkList.as_view()),
    url(r'^mark/(?P<pk>[0-9]+)/$', mark_views.MarkDetail.as_view()),

    url(r'^school/$', school_views.SchoolList.as_view()),
    url(r'^school/(?P<pk>[0-9]+)/$', school_views.SchoolDetail.as_view()),

    url(r'^student/$', student_views.StudentList.as_view()),
    url(r'^student/(?P<pk>[0-9]+)/$', student_views.StudentDetail.as_view()),

    url(r'^subject/$', subject_views.SubjectList.as_view()),
    url(r'^subject/(?P<pk>[0-9]+)/$', subject_views.SubjectDetail.as_view()),

    url(r'^test/$', test_views.TestList.as_view()),
    url(r'^test/(?P<pk>[0-9]+)/$', test_views.TestDetail.as_view())
]
