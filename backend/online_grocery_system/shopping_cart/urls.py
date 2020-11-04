from django.urls import path
from shopping_cart.views import  CartView, OrdersView,ContactUsView

urlpatterns = [
    path('', CartView.as_view()),
    path('order',OrdersView.as_view()),
    path('contactus',ContactUsView.as_view())
]
