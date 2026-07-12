from django.db import models

class BusinessInquiry(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True) # মেসেজ আসার সময়টা অটো সেভ হবে

    def __str__(self):
        return f"Inquiry from {self.name} - {self.email}"

class JobApplication(models.Model):
    position = models.CharField(max_length=255)
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    english_level = models.CharField(max_length=100)
    cover_letter = models.TextField()
    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} - {self.position}"