#inicialización de estados 
import re
import time

 # Lenguaje natural por expresiones regulares 
saludos_RE = "[h|H](o)+la|[q|Q]ue (onda|tranza|tal|pedo)|[b|B]uen[a|o]s (tardes|noches|d[i|í]as)|[h|H]i|[h|H]ello"
Promo_RE = "promociones|promos?|descuen(tos|tazos)|oferta(s)?|precio(s)?"
Cita_RE = "cita|servicio|agendar|cambi(o|ar)|arreglar|pintura|hojalater(i|í)a"
Venta_RE = "venta|comprar|venden"
correo_RE = "^[a-zA-Z0-9._-]+@[a-zA-Z]+(?:\.[a-zA-Z0-9-]+)+"
afirmacion_RE = "s[i|í]|claro|definitavamente"
despedidas_RE = "gracias|ok|adios|vale|de acuerdo|chao|bye|nada|[n|N]o"
# arrependimiento_RE = "equivoque|perdon(a)?|regresa(r)?|cambiar|error"

state=0
flag = 0
Salida=1
while Salida:
    if state==0:
      if flag==0:
        print("Hola soy el Chatbot de la FORD ¿En qué te puedo ayudar?")
        time.sleep(1)
        opcion=input("Soy capaz de informarte de nuestras promociones, venta de vehículos y ayudarte a agendar un servicio. \n\t\t\t")
      elif flag==1:
        opcion = input("¿Como le puedo ayudar? \n\t\t\t")
      if re.findall(Promo_RE, opcion, flags=0)!=[]:
        state = 1
      elif re.findall(Cita_RE, opcion, flags=0)!=[]: 
        state = 2
      elif re.findall(Venta_RE, opcion, flags=0)!=[]:  
        state = 3
      else:
        if re.findall(saludos_RE, opcion, flags=0)!=[]:
          print("¡Hola!")
          flag = 1
        elif re.findall(despedidas_RE, opcion, flags=0)!=[]:
          print("¡Hasta luego!")
          Salida = 0
        else:
          print("Yo no le puedo ayudar en esa situación, deje le contacto con alguien.")
          state = 6
#*******************************************************************************      
    if state == 1:
      print("Nuestras promociones las puede encontrar en el siguiente link \n https://www.ford.mx/compra/promociones/national")
      state = 6
#*******************************************************************************
    if state == 2:
      date = input("¿Que día le gustaría que fuera su cita? ")
      state = 4
    if state == 4:
      hour = input("Perfecto, ¿A que hora le gustaría? ")
      state = 5
    if state == 5:
      print("Gracias, en un momento le atendera un operador.")
      state = 6
#*******************************************************************************
    if state == 3:
      isOk = 1
      while isOk:
        email = input("Me podría proporcionar su correo por favor.")
        if re.findall(correo_RE, email, flags=0)!=[]:
            isOk = 0
        else: 
          print("Correo Invalido, intentelo de nuevo.")
      state = 7
    if state == 7:
      print("Gracias, le contactaremos en breve. \n")
      state = 6
#*******************************************************************************
    if state == 6:
        opcion=input("¿Le puedo ayudar en algo más?  \n\t\t\t")
        if re.findall(afirmacion_RE, opcion, flags=0!=[]):
            state=0
        else:
            print("Gracias fue un placer atenderle")
            Salida=0