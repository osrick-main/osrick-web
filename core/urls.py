from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('why-choose-us/', views.why_choose_us, name='why_choose_us'),
    path('industries/', views.industries, name='industries'),
    path('clients/', views.clients, name='clients'),
    path('careers/', views.careers, name='careers'),
    path('blog/', views.blog, name='blog'),
    path('contact/', views.contact, name='contact'),
    path('save-inquiry/', views.save_inquiry, name='save_inquiry'),
    path('save-application/', views.save_application, name='save_application'),

    # Services
    path('services/', views.services_main, name='services_main'),
    path('services/inbound/', views.inbound, name='inbound'),
    path('services/outbound/', views.outbound, name='outbound'),
    path('services/live-chat/', views.live_chat, name='live_chat'),
    path('services/email-ticket/', views.email_ticket, name='email_ticket'),
    path('services/technical-helpdesk/', views.technical_helpdesk, name='technical_helpdesk'),
]