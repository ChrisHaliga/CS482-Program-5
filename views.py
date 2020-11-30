from django.views import View
from django.http import JsonResponse
from mysite.models import MyItem
import json

#a real app would use models with a database
class Item(View):
  # Gets the list of all MyItem's for the user provided
  def get(self,request):
    user = request.GET.get("user",None)
    print(user)

    #Json doesn't support tuples, so a list of
    #objects (dictionaries) is constructed to return
    ret = None
    if user:
      ret = MyItem.objects.filter(user=user).values()
      ret = list(ret)

    return JsonResponse(json.dumps(ret),safe=False)

  # Adds a new zipcode to the database
  def post(self,request):
    user = request.POST.get("user",None)
    zipcode = request.POST.get("zip",None)
     
    print(user)
    print(zipcode)
    if user and zipcode:
      thisItem = MyItem(user=user, zipcode=zipcode)
      if len(MyItem.objects.filter(user=user, zipcode=zipcode)) > 0:
        thisItem=MyItem.objects.filter(user=user, zipcode=zipcode)[0]
        
      thisItem.save()
    ret = MyItem.objects.filter(user=user).values()
    return JsonResponse(json.dumps(list(ret)),safe=False)
