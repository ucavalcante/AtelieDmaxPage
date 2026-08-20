const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', 'img', 'products');
const jsonFile = path.join(__dirname, '..', 'data', 'products.json');

const categories = [
    {
        id: 'enxoval-bebe',
        name: 'Enxoval de Bebê',
        description: 'Enxovais personalizados com bordados únicos para bebês',
        folder: 'enxoval-bebe',
        keywords: ['enxoval', 'bebê', 'bordado', 'maternidade', 'personalizado']
    },
    {
        id: 'sapato-infantil',
        name: 'Sapato Infantil Customizado',
        description: 'Sapatos infantis personalizados com bordados e decorações únicas',
        folder: 'sapato-infantil',
        keywords: ['sapato', 'infantil', 'customizado', 'pérola', 'bebê', 'festa']
    },
    {
        id: 'batizado',
        name: 'Batizado',
        description: 'Artigos especiais para cerimônias de batizado',
        folder: 'batizado',
        keywords: ['batizado', 'vela', 'toalha', 'lembrancinha', 'religioso']
    },
    {
        id: 'caixa-convite',
        name: 'Caixa Convite',
        description: 'Convites em caixas personalizadas para ocasiões especiais',
        folder: 'caixa-convite',
        keywords: ['caixa', 'convite', 'padrinhos', 'mdf', 'casamento', 'batizado']
    },
    {
        id: 'ocasioes-especiais',
        name: 'Ocasiões Especiais',
        description: 'Produtos personalizados para momentos únicos e inesquecíveis',
        folder: 'ocasioes-especiais',
        keywords: ['ocasiões', 'especiais', 'presentes', 'mdf', 'decoração', 'datas']
    },
    {
        id: 'depoimentos',
        name: 'Depoimentos',
        description: 'O que nossos clientes dizem sobre nossos produtos e atendimento',
        folder: 'depoimentos',
        keywords: ['depoimentos', 'avaliacoes', 'clientes', 'feedback']
    }
];

function generateManifest() {
    const validExtensions = ['.jpeg', '.jpg', '.png', '.webp'];

    const resultCategories = categories.map(cat => {
        const catFolder = path.join(imgDir, cat.folder);
        let images = [];

        if (fs.existsSync(catFolder)) {
            const files = fs.readdirSync(catFolder);
            images = files.filter(f => validExtensions.includes(path.extname(f).toLowerCase()));
        }

        console.log(`📸 Categoria ${cat.name} (${cat.folder}): ${images.length} imagens encontradas.`);

        return {
            ...cat,
            images: images
        };
    });

    const manifest = {
        categories: resultCategories,
        lastUpdated: new Date().toISOString()
    };

    fs.mkdirSync(path.dirname(jsonFile), { recursive: true });
    fs.writeFileSync(jsonFile, JSON.stringify(manifest, null, 2), 'utf-8');
    console.log(`✅ data/products.json gerado com sucesso!`);
}

generateManifest();
