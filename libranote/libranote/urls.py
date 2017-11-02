from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin
from django.conf import settings
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/v1/', include('libranote.api.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
