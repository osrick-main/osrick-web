from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import BusinessInquiry
from .models import JobApplication
from django.shortcuts import render

def privacy(request):
    return render(request, 'legal/privacy.html')

def terms(request):
    return render(request, 'legal/terms.html')

def cookies(request):
    return render(request, 'legal/cookies.html')
def save_application(request):
    if request.method == "POST":
        position = request.POST.get('position')
        full_name = request.POST.get('full_name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        english_level = request.POST.get('english_level')
        cover_letter = request.POST.get('cover_letter')
        
        if position and full_name and email and phone:
            JobApplication.objects.create(
                position=position,
                full_name=full_name,
                email=email,
                phone=phone,
                english_level=english_level,
                cover_letter=cover_letter
            )
            return JsonResponse({'status': 'success'})
        return JsonResponse({'status': 'error', 'message': 'Missing required fields.'}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid request.'}, status=405)

@csrf_exempt # সাময়িকভাবে CSRF সহজ করার জন্য, আপনি চাইলে টোকেনও পাস করতে পারেন
def save_inquiry(request):
    if request.method == "POST":
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        
        if name and email and message:
            # ডাটাবেজে সেভ হচ্ছে
            inquiry = BusinessInquiry.objects.create(
                name=name,
                email=email,
                message=message
            )
            return JsonResponse({'status': 'success', 'message': 'Thank you! Your message has been sent.'})
        
        return JsonResponse({'status': 'error', 'message': 'All fields are required.'}, status=400)
    
    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'}, status=405)
# Home
def home(request):
    return render(request, 'home.html')

# About
def about(request):
    return render(request, 'about.html')

# Why Choose Us
def why_choose_us(request):
    return render(request, 'why_choose_us.html')

# Industries
def industries(request):
    return render(request, 'industries.html')

# Clients & Testimonials
def clients(request):
    return render(request, 'clients.html')

# Careers
def careers(request):
    return render(request, 'careers.html')

# Blog
def blog(request):
    return render(request, 'blog.html')

# Contact
def contact(request):
    return render(request, 'contact.html')

# Services
def services_main(request):
    return render(request, 'services/services_main.html')

def inbound(request):
    return render(request, 'services/inbound.html')

def outbound(request):
    return render(request, 'services/outbound.html')

def live_chat(request):
    return render(request, 'services/live_chat.html')

def email_ticket(request):
    return render(request, 'services/email_ticket.html')

def technical_helpdesk(request):
    return render(request, 'services/technical_helpdesk.html')