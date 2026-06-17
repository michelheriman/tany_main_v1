const API_URL = 'https://mtk.pythonanywhere.com';
const API = '/export/kml';

async function checker() {
    const userToken = localStorage.getItem('auth_token');
    
    if (!userToken) {  // catches both null and undefined
        alert("Please sign in");
        window.location.href = './signin.html';
        return null;
    }
    
    console.log('Token being sent:', userToken);
    return userToken;
}


let exp = document.getElementById('export_kml');
exp.addEventListener('click', async () =>{
    const token = await checker();//localStorage.getItem('auth_token'); // or wherever you store it
    console.log(token);
    
    const response = await fetch(`${API_URL}${API}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.error('Export failed');
        return;
    }

    // Trigger file download
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'export.kml';
    a.click();
    window.URL.revokeObjectURL(url);
    
});
