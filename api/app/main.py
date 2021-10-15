from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
from flask import Flask, request, jsonify
from fpdf import FPDF


app = Flask(__name__)
CORS(app)


cors = CORS(app, resources={
    r"/*": {
        "origins": "*"
    }
})
app.config["CLIENT_CSV"] ="/app"

@app.route('/details', methods=['POST'])
def query_records():
    d=request.get_json()

    print(d)
    pdf_generate(d)
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@app.route('/get-pdf',methods = ['GET'])
def get_csv():
    return send_from_directory("/app", "resume.pdf", as_attachment=True)

def pdf_generate(data):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size = 15)
    #pdf.cell(20, 10, 'Title', 1, 0, 'C')
    pdf.cell(190,10,data['firstName'].upper()+" "+ data['lastName'].upper(),1,0, 'C')

    pdf.cell(100, 10, ln=1, align='C')
    pdf.cell(30, 30, ln=1 ,txt='CONTACT', align='C')

    pdf.cell(30,txt='Phone:', align='L')
    pdf.cell(30,0,txt=data['phone'],ln=1 ,align='L')

    pdf.cell(30,20,txt='Address:', align='L')
    pdf.cell(120,20,txt=data['address'],ln=1 ,align='L')

    pdf.cell(25,0,txt='email:', align='L')
    pdf.cell(60,0,txt=data['email'],ln=1 ,align='L')

    pdf.cell(30,20,txt='Country:', align='L')
    pdf.cell(10,20,txt=data['country'],ln=1 ,align='L')

    pdf.cell(55,0,txt='City:'+" "+data['city'],ln=1, align='L')
    pdf.cell(38,20,txt='Zip:'+" "+data['zip'],ln=1, align='L')

    pdf.cell(30, 30, ln=1 ,txt='EDUCATION', align='C')

    for i in data['education']:
        pdf.cell(140,0,txt="> "+i['institution']+", "+i['location'],ln=1, align='L')
        pdf.cell(110,20,txt=i['degree']+". "+i['field'],ln=1, align='L')
        pdf.cell(35,0,txt=i['syear']+"-"+i['eyear'],ln=1, align='L')
        pdf.cell(0, 20, ln=1, align='C')

    pdf.cell(30, 25, ln=1 ,txt='EXPERIENCE', align='C')
    for i in data['experience']:
        pdf.cell(80,10,txt="> "+i['job'],ln=1, align='L')
        pdf.cell(80,10,txt=i['company']+" | "+i['syear'],ln=1, align='L')
        pdf.cell(80,10,txt=i['country']+", "+i['state'],ln=1, align='L')

    pdf.cell(20, 30, ln=1 ,txt='SKILLS', align='C')
    for i in data['skills']:
        pdf.cell(10,10,txt=">"+i['skill'],ln=1, align='L')

    pdf.output("resume.pdf")   

if __name__ == "__main__":
    app.run(debug=True)