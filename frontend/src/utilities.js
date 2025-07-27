export const fetchData = async (url) => {

    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    const json = await response.json()
    return json
}

export const regionsData = [
    {
        id: 'abruzzo',
        regionName: 'Abruzzo',
        description: 'Arrosticini, zafferano, Montepulciano d\'Abruzzo',
    },
    {
        id: 'basilicata',
        regionName: 'Basilicata',
        description: 'Peperoni cruschi, pasta fatta in casa, Aglianico del Vulture',
    },
    {
        id: 'calabria',
        regionName: 'Calabria',
        description: 'Nduja, bergamotto, pesce spada',
    },
    {
        id: 'campania',
        regionName: 'Campania',
        description: 'Pizza napoletana, cucina mediterranea, mozzarella di bufala',
    },
    {
        id: 'emilia-romagna',
        regionName: 'Emilia-Romagna',
        description: 'Parmigiano Reggiano, Prosciutto di Parma, pasta all\'uovo',
    },
    {
        id: 'friuli-venezia-giulia',
        regionName: 'Friuli-Venezia Giulia',
        description: 'Prosciutto di San Daniele, Montasio, vini bianchi',
    },
    {
        id: 'lazio',
        regionName: 'Lazio',
        description: 'Cacio e pepe, amatriciana, carciofi alla romana',
    },
    {
        id: 'liguria',
        regionName: 'Liguria',
        description: 'Pesto, focaccia, cucina marinara',
    },
    {
        id: 'lombardia',
        regionName: 'Lombardia',
        description: 'Risotto alla milanese, cotoletta, panettone',
    },
    {
        id: 'marche',
        regionName: 'Marche',
        description: 'Olive all\'ascolana, vincisgrassi, Verdicchio',
    },
    {
        id: 'molise',
        regionName: 'Molise',
        description: 'Cavatelli, tartufi, formaggi tipici',
    },
    {
        id: 'piemonte',
        regionName: 'Piemonte',
        description: 'Tartufo bianco d\'Alba, Barolo, agnolotti',
    },
    {
        id: 'puglia',
        regionName: 'Puglia',
        description: 'Orecchiette, olio d\'oliva, burrata',
    },
    {
        id: 'sardegna',
        regionName: 'Sardegna',
        description: 'Pecorino sardo, mirto, pane carasau',
    },
    {
        id: 'sicilia',
        regionName: 'Sicilia',
        description: 'Pesce fresco, arancini, cannoli',
    },
    {
        id: 'toscana',
        regionName: 'Toscana',
        description: 'Cucina tradizionale, vini pregiati, fiorentina',
    },
    {
        id: 'trentino-alto-adige',
        regionName: 'Trentino-Alto Adige',
        description: 'Strudel, speck, canederli',
    },
    {
        id: 'umbria',
        regionName: 'Umbria',
        description: 'Tartufo nero, lenticchie di Castelluccio, Norcineria',
    },
    {
        id: 'valle-d-aosta',
        regionName: 'Valle d\'Aosta',
        description: 'Fonduta, fontina, lardo di Arnad',
    },
    {
        id: 'veneto',
        regionName: 'Veneto',
        description: 'Risotto al nero di seppia, tiramisù, prosecco',
    },
];
