from django.contrib import admin
from .models import BusinessInquiry # আপনার মডেলের নাম
from .models import JobApplication

@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'position', 'english_level', 'applied_at')
    list_filter = ('position', 'english_level')
    search_fields = ('full_name', 'email', 'phone')

# অ্যাডমিন প্যানেলে মডেলটি রেজিস্টার করা হচ্ছে
@admin.register(BusinessInquiry)
class BusinessInquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at') # প্যানেলে এই কলামগুলো দেখাবে
    search_fields = ('name', 'email')