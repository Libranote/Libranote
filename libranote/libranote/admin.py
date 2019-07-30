from django.contrib import admin
from libranote.api.accounts.models import Account
from libranote.api.classes.models import Class
from libranote.api.courses.models import Course
from libranote.api.homeworks.models import Homework
from libranote.api.levels.models import Level
from libranote.api.marks.models import Mark
from libranote.api.schools.models import School
from libranote.api.students.models import Student
from libranote.api.subjects.models import Subject
from libranote.api.tests.models import Test

admin.site.register(Account)
admin.site.register(Class)
admin.site.register(Course)
admin.site.register(Homework)
admin.site.register(Level)
admin.site.register(Mark)
admin.site.register(School)
admin.site.register(Student)
admin.site.register(Subject)
admin.site.register(Test)
