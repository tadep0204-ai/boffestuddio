/* =========================================================
   BOFFESTUDDIO · DATOS DE LA TIENDA
   ---------------------------------------------------------
   Acá se cargan, editan o sacan productos. Cada perfume es
   una línea con estos datos:

   - marca, nombre
   - genero: "hombre", "mujer" o "unisex"
     (define en cuál de las opciones de la portada aparece)
   - Los productos que no son perfumes llevan
     categoria: "varios" en lugar de genero.
   - foto: ruta a la foto dentro de la carpeta img/
     (ej: "img/lattafa-khamrah.jpg"). Si queda "" se muestra
     un dibujo de frasco.

   Datos opcionales (se agregan dentro de las llaves):
   - precio: 89990            → número sin puntos. Si no está,
                                aparece "Consultar precio".
   - stock: false             → muestra "Sin stock".
   - destacado: true          → aparece primero en la lista.
   - contenido: "100 ml"
   - descripcion: "texto…"
   - notas: { salida: "…", corazon: "…", fondo: "…" }

   Ejemplo con todo:
   { id: "lattafa-khamrah", marca: "Lattafa", nombre: "Khamrah",
     genero: "unisex", foto: "img/lattafa-khamrah.jpg",
     precio: 84990, contenido: "100 ml", destacado: true },
   ========================================================= */

const CONFIG = {
  nombre: "BoffeStuddio",
  whatsapp: "5492214001869",   // 54 9 + característica + número, sin espacios
  telefonoVisible: "221 400-1869",
  instagram: "boffestuddio",
  ciudad: "La Plata",
};

/* Las opciones de la portada y los filtros del catálogo */
const FILTROS = [
  { id: "hombre", nombre: "Hombre", bajada: "Perfumes masculinos" },
  { id: "mujer",  nombre: "Mujer",  bajada: "Perfumes femeninos" },
  { id: "unisex", nombre: "Unisex", bajada: "Para todos" },
  { id: "varios", nombre: "Varios", bajada: "Accesorios y más" },
];

const PRODUCTOS = [

  /* Afnan */
  { id: "afnan-9-am-pour-femme", marca: "Afnan", nombre: "9 AM Pour Femme", genero: "mujer", foto: "img/afnan-9-am-pour-femme.jpg" },
  { id: "afnan-9-pm-elixir", marca: "Afnan", nombre: "9 PM Elixir", genero: "hombre", foto: "img/afnan-9-pm-elixir.jpg" },
  { id: "afnan-9-pm-night-out-extract", marca: "Afnan", nombre: "9 PM Night Out Extract", genero: "hombre", foto: "img/afnan-9-pm-night-out-extract.jpg" },
  { id: "afnan-9-am", marca: "Afnan", nombre: "9 AM", genero: "hombre", foto: "img/afnan-9-am.jpg" },
  { id: "afnan-9-am-dive", marca: "Afnan", nombre: "9 AM Dive", genero: "unisex", foto: "img/afnan-9-am-dive.jpg" },
  { id: "afnan-9-pm", marca: "Afnan", nombre: "9 PM", genero: "hombre", foto: "img/afnan-9-pm.jpg", destacado: true },
  { id: "afnan-9-pm-pour-femme", marca: "Afnan", nombre: "9 PM Pour Femme", genero: "mujer", foto: "img/afnan-9-pm-pour-femme.jpg" },
  { id: "afnan-9-pm-rebel", marca: "Afnan", nombre: "9 PM Rebel", genero: "unisex", foto: "img/afnan-9-pm-rebel.jpg" },
  { id: "afnan-supremacy", marca: "Afnan", nombre: "Supremacy", genero: "hombre", foto: "img/afnan-supremacy.jpg" },
  { id: "afnan-turathi-electric", marca: "Afnan", nombre: "Turathi Electric", genero: "unisex", foto: "img/afnan-turathi-electric.jpg" },
  { id: "afnan-turathi-blue", marca: "Afnan", nombre: "Turathi Blue", genero: "hombre", foto: "img/afnan-turathi-blue.jpg" },

  /* Al Haramain */
  { id: "al-haramain-amber-oud-aqua-dubai", marca: "Al Haramain", nombre: "Amber Oud Aqua Dubai", genero: "unisex", foto: "img/al-haramain-amber-oud-aqua-dubai.jpg" },
  { id: "al-haramain-amber-oud-dubai-night", marca: "Al Haramain", nombre: "Amber Oud Dubai Night", genero: "unisex", foto: "img/al-haramain-amber-oud-dubai-night.jpg" },
  { id: "al-haramain-amber-oud-gold-edition", marca: "Al Haramain", nombre: "Amber Oud Gold Edition", genero: "unisex", foto: "img/al-haramain-amber-oud-gold-edition.jpg" },
  { id: "al-haramain-amber-oud-rouge", marca: "Al Haramain", nombre: "Amber Oud Rouge", genero: "unisex", foto: "img/al-haramain-amber-oud-rouge.jpg" },

  /* Armaf */
  { id: "armaf-club-de-nuit-bling", marca: "Armaf", nombre: "Club de Nuit Bling", genero: "hombre", foto: "img/armaf-club-de-nuit-bling.jpg" },
  { id: "armaf-club-de-nuit-iconic", marca: "Armaf", nombre: "Club de Nuit Iconic", genero: "hombre", foto: "img/armaf-club-de-nuit-iconic.jpg" },
  { id: "armaf-club-de-nuit-intense-man", marca: "Armaf", nombre: "Club de Nuit Intense Man", genero: "hombre", foto: "img/armaf-club-de-nuit-intense-man.jpg", destacado: true },
  { id: "armaf-club-de-nuit-maleka", marca: "Armaf", nombre: "Club de Nuit Maleka", genero: "mujer", foto: "img/armaf-club-de-nuit-maleka.jpg" },
  { id: "armaf-club-de-nuit-milestone", marca: "Armaf", nombre: "Club de Nuit Milestone", genero: "unisex", foto: "img/armaf-club-de-nuit-milestone.jpg" },
  { id: "armaf-club-de-nuit-oud-parfum", marca: "Armaf", nombre: "Club de Nuit Oud Parfum", genero: "unisex", foto: "img/armaf-club-de-nuit-oud-parfum.jpg" },
  { id: "armaf-club-de-nuit-precieux", marca: "Armaf", nombre: "Club de Nuit Précieux", genero: "hombre", foto: "img/armaf-club-de-nuit-precieux.jpg" },
  { id: "armaf-club-de-nuit-sillage", marca: "Armaf", nombre: "Club de Nuit Sillage", genero: "unisex", foto: "img/armaf-club-de-nuit-sillage.jpg" },
  { id: "armaf-club-de-nuit-untold", marca: "Armaf", nombre: "Club de Nuit Untold", genero: "unisex", foto: "img/armaf-club-de-nuit-untold.jpg", destacado: true },
  { id: "armaf-club-de-nuit-urban-man-elixir", marca: "Armaf", nombre: "Club de Nuit Urban Man Elixir", genero: "hombre", foto: "img/armaf-club-de-nuit-urban-man-elixir.jpg" },
  { id: "armaf-club-de-nuit-woman", marca: "Armaf", nombre: "Club de Nuit Woman", genero: "mujer", foto: "img/armaf-club-de-nuit-woman.jpg" },
  { id: "armaf-dunescape", marca: "Armaf", nombre: "Dunescape", genero: "unisex", foto: "" },
  { id: "armaf-odyssey-mandarin-sky-elixir", marca: "Armaf", nombre: "Odyssey Mandarin Sky Elixir", genero: "hombre", foto: "img/armaf-odyssey-mandarin-sky-elixir.jpg" },
  { id: "armaf-odyssey-aqua-100-ml", marca: "Armaf", nombre: "Odyssey Aqua 100 ml", genero: "hombre", foto: "img/armaf-odyssey-aqua-100-ml.jpg" },
  { id: "armaf-odyssey-artisto", marca: "Armaf", nombre: "Odyssey Artisto", genero: "hombre", foto: "" },
  { id: "armaf-odyssey-candee", marca: "Armaf", nombre: "Odyssey Candee", genero: "mujer", foto: "img/armaf-odyssey-candee.jpg" },
  { id: "armaf-odyssey-homme", marca: "Armaf", nombre: "Odyssey Homme", genero: "hombre", foto: "img/armaf-odyssey-homme.jpg" },
  { id: "armaf-odyssey-homme-white-edition", marca: "Armaf", nombre: "Odyssey Homme White Edition", genero: "hombre", foto: "img/armaf-odyssey-homme-white-edition.jpg" },
  { id: "armaf-odyssey-limoni", marca: "Armaf", nombre: "Odyssey Limoni", genero: "unisex", foto: "img/armaf-odyssey-limoni.jpg" },
  { id: "armaf-odyssey-mandarin-sky", marca: "Armaf", nombre: "Odyssey Mandarin Sky", genero: "hombre", foto: "img/armaf-odyssey-mandarin-sky.jpg", destacado: true },
  { id: "armaf-odyssey-mandarin-sky-vintage", marca: "Armaf", nombre: "Odyssey Mandarin Sky Vintage", genero: "hombre", foto: "" },
  { id: "armaf-odyssey-mega", marca: "Armaf", nombre: "Odyssey Mega", genero: "hombre", foto: "img/armaf-odyssey-mega.jpg" },
  { id: "armaf-odyssey-revolution", marca: "Armaf", nombre: "Odyssey Revolution", genero: "hombre", foto: "img/armaf-odyssey-revolution.jpg" },
  { id: "armaf-odyssey-spectra", marca: "Armaf", nombre: "Odyssey Spectra", genero: "unisex", foto: "img/armaf-odyssey-spectra.jpg" },
  { id: "armaf-odyssey-tag-her-donna-colorata", marca: "Armaf", nombre: "Odyssey Tag Her Donna Colorata", genero: "mujer", foto: "" },
  { id: "armaf-odyssey-tag-him-pour-homme", marca: "Armaf", nombre: "Odyssey Tag Him Pour Homme", genero: "hombre", foto: "" },
  { id: "armaf-odyssey-tag-him-uomo-nero", marca: "Armaf", nombre: "Odyssey Tag Him Uomo Nero", genero: "hombre", foto: "" },
  { id: "armaf-odyssey-tag-him-uomo-rosso", marca: "Armaf", nombre: "Odyssey Tag Him Uomo Rosso", genero: "hombre", foto: "" },
  { id: "armaf-odyssey-tyrant", marca: "Armaf", nombre: "Odyssey Tyrant", genero: "hombre", foto: "img/armaf-odyssey-tyrant.jpg" },
  { id: "armaf-yum-yum", marca: "Armaf", nombre: "Yum Yum", genero: "mujer", foto: "img/armaf-yum-yum.jpg" },

  /* Armani */
  { id: "armani-acqua-di-gio", marca: "Armani", nombre: "Acqua di Giò", genero: "hombre", foto: "" },
  { id: "armani-armani-code", marca: "Armani", nombre: "Armani Code", genero: "hombre", foto: "" },

  /* Azzaro */
  { id: "azzaro-the-most-wanted-parfum", marca: "Azzaro", nombre: "The Most Wanted Parfum", genero: "hombre", foto: "img/azzaro-the-most-wanted-parfum.jpg" },

  /* Bharara */
  { id: "bharara-bharara-king", marca: "Bharara", nombre: "Bharara King", genero: "hombre", foto: "img/bharara-bharara-king.jpg" },
  { id: "bharara-bharara-rose", marca: "Bharara", nombre: "Bharara Rose", genero: "mujer", foto: "img/bharara-bharara-rose.jpg" },

  /* Calvin Klein */
  { id: "calvin-klein-ck-one", marca: "Calvin Klein", nombre: "CK One", genero: "unisex", foto: "img/calvin-klein-ck-one.jpg" },

  /* Carolina Herrera */
  { id: "carolina-herrera-bad-boy", marca: "Carolina Herrera", nombre: "Bad Boy", genero: "hombre", foto: "img/carolina-herrera-bad-boy.jpg" },

  /* Dior */
  { id: "dior-sauvage", marca: "Dior", nombre: "Sauvage", genero: "hombre", foto: "img/dior-sauvage.jpg", destacado: true },

  /* Emporio Armani */
  { id: "emporio-armani-stronger-with-you-intensely", marca: "Emporio Armani", nombre: "Stronger With You Intensely", genero: "hombre", foto: "img/emporio-armani-stronger-with-you-intensely.jpg" },

  /* French Avenue */
  { id: "french-avenue-azzure-aoud", marca: "French Avenue", nombre: "Azzure Aoud", genero: "unisex", foto: "img/french-avenue-azzure-aoud.jpg" },
  { id: "french-avenue-liquid-brun", marca: "French Avenue", nombre: "Liquid Brun", genero: "hombre", foto: "img/french-avenue-liquid-brun.jpg" },
  { id: "french-avenue-spectre-ghost", marca: "French Avenue", nombre: "Spectre Ghost", genero: "hombre", foto: "img/french-avenue-spectre-ghost.jpg" },
  { id: "french-avenue-veneno-negro", marca: "French Avenue", nombre: "Veneno (negro)", genero: "unisex", foto: "img/french-avenue-veneno-negro.jpg" },
  { id: "french-avenue-veneno-blanco", marca: "French Avenue", nombre: "Veneno Blanco", genero: "unisex", foto: "img/french-avenue-veneno-blanco.jpg" },
  { id: "french-avenue-veneno-scarlett", marca: "French Avenue", nombre: "Veneno Scarlett", genero: "mujer", foto: "img/french-avenue-veneno-scarlett.jpg" },
  { id: "french-avenue-vulcan", marca: "French Avenue", nombre: "Vulcan", genero: "hombre", foto: "img/french-avenue-vulcan.jpg" },
  { id: "french-avenue-vulcan-black-friday", marca: "French Avenue", nombre: "Vulcan Black Friday", genero: "hombre", foto: "img/french-avenue-vulcan-black-friday.jpg" },

  /* Issey Miyake */
  { id: "issey-miyake-l-eau-d-issey-pour-homme", marca: "Issey Miyake", nombre: "L'Eau d'Issey Pour Homme", genero: "hombre", foto: "img/issey-miyake-l-eau-d-issey-pour-homme.jpg" },

  /* Jean Paul Gaultier */
  { id: "jean-paul-gaultier-le-beau-le-parfum-125-ml", marca: "Jean Paul Gaultier", nombre: "Le Beau Le Parfum 125 ml", genero: "hombre", foto: "img/jean-paul-gaultier-le-beau-le-parfum-125-ml.jpg" },
  { id: "jean-paul-gaultier-le-beau-paradise-garden", marca: "Jean Paul Gaultier", nombre: "Le Beau Paradise Garden", genero: "hombre", foto: "" },
  { id: "jean-paul-gaultier-le-male-elixir", marca: "Jean Paul Gaultier", nombre: "Le Male Elixir", genero: "hombre", foto: "img/jean-paul-gaultier-le-male-elixir.jpg" },
  { id: "jean-paul-gaultier-le-male-le-parfum-125-ml", marca: "Jean Paul Gaultier", nombre: "Le Male Le Parfum 125 ml", genero: "hombre", foto: "img/jean-paul-gaultier-le-male-le-parfum-125-ml.jpg" },
  { id: "jean-paul-gaultier-scandal-intense-femme", marca: "Jean Paul Gaultier", nombre: "Scandal Intense Femme", genero: "mujer", foto: "img/jean-paul-gaultier-scandal-intense-femme.jpg" },
  { id: "jean-paul-gaultier-scandal-le-parfum", marca: "Jean Paul Gaultier", nombre: "Scandal Le Parfum", genero: "hombre", foto: "img/jean-paul-gaultier-scandal-le-parfum.jpg" },

  /* Lancôme */
  { id: "lancome-la-vie-est-belle", marca: "Lancôme", nombre: "La Vie Est Belle", genero: "mujer", foto: "" },

  /* Lattafa */
  { id: "lattafa-afeef", marca: "Lattafa", nombre: "Afeef", genero: "unisex", foto: "" },
  { id: "lattafa-ajwad", marca: "Lattafa", nombre: "Ajwad", genero: "unisex", foto: "img/lattafa-ajwad.jpg" },
  { id: "lattafa-ajwad-pink", marca: "Lattafa", nombre: "Ajwad Pink", genero: "mujer", foto: "img/lattafa-ajwad-pink.jpg" },
  { id: "lattafa-al-nashama", marca: "Lattafa", nombre: "Al Nashama", genero: "unisex", foto: "img/lattafa-al-nashama.jpg" },
  { id: "lattafa-al-noble-safeer", marca: "Lattafa", nombre: "Al Noble Safeer", genero: "unisex", foto: "img/lattafa-al-noble-safeer.jpg" },
  { id: "lattafa-al-noble-wazeer", marca: "Lattafa", nombre: "Al Noble Wazeer", genero: "unisex", foto: "img/lattafa-al-noble-wazeer.jpg" },
  { id: "lattafa-al-qiam-gold", marca: "Lattafa", nombre: "Al Qiam Gold", genero: "unisex", foto: "img/lattafa-al-qiam-gold.jpg" },
  { id: "lattafa-amethyst-bade-e-al-oud", marca: "Lattafa", nombre: "Amethyst Bade'e Al Oud", genero: "unisex", foto: "img/lattafa-amethyst-bade-e-al-oud.jpg" },
  { id: "lattafa-ana-abiyedh", marca: "Lattafa", nombre: "Ana Abiyedh", genero: "unisex", foto: "img/lattafa-ana-abiyedh.jpg" },
  { id: "lattafa-angham", marca: "Lattafa", nombre: "Angham", genero: "unisex", foto: "img/lattafa-angham.jpg" },
  { id: "lattafa-ansaam-gold", marca: "Lattafa", nombre: "Ansaam Gold", genero: "unisex", foto: "" },
  { id: "lattafa-art-of-universe", marca: "Lattafa", nombre: "Art of Universe", genero: "unisex", foto: "img/lattafa-art-of-universe.jpg" },
  { id: "lattafa-asad-bourbon", marca: "Lattafa", nombre: "Asad Bourbon", genero: "hombre", foto: "img/lattafa-asad-bourbon.jpg" },
  { id: "lattafa-asad-elixir", marca: "Lattafa", nombre: "Asad Elixir", genero: "hombre", foto: "img/lattafa-asad-elixir.jpg", destacado: true },
  { id: "lattafa-asad-negro", marca: "Lattafa", nombre: "Asad Negro", genero: "hombre", foto: "img/lattafa-asad-negro.jpg" },
  { id: "lattafa-asad-zanzibar", marca: "Lattafa", nombre: "Asad Zanzibar", genero: "hombre", foto: "img/lattafa-asad-zanzibar.jpg" },
  { id: "lattafa-atlas", marca: "Lattafa", nombre: "Atlas", genero: "unisex", foto: "img/lattafa-atlas.jpg" },
  { id: "lattafa-blue-sapphire", marca: "Lattafa", nombre: "Blue Sapphire", genero: "unisex", foto: "img/lattafa-blue-sapphire.jpg" },
  { id: "lattafa-combo-asad", marca: "Lattafa", nombre: "Combo Asad", genero: "hombre", foto: "img/lattafa-combo-asad.jpg" },
  { id: "lattafa-combo-mini-yara-25-ml", marca: "Lattafa", nombre: "Combo Mini Yara 25 ml", genero: "mujer", foto: "img/lattafa-combo-mini-yara-25-ml.jpg" },
  { id: "lattafa-combo-mini-yara-5-ml", marca: "Lattafa", nombre: "Combo Mini Yara 5 ml", genero: "mujer", foto: "img/lattafa-combo-mini-yara-5-ml.jpg" },
  { id: "lattafa-combo-yara-100-ml-x2", marca: "Lattafa", nombre: "Combo Yara 100 ml x2", genero: "mujer", foto: "img/lattafa-combo-yara-100-ml-x2.jpg" },
  { id: "lattafa-confidential-private-gold", marca: "Lattafa", nombre: "Confidential Private Gold", genero: "unisex", foto: "img/lattafa-confidential-private-gold.jpg" },
  { id: "lattafa-eclaire", marca: "Lattafa", nombre: "Eclaire", genero: "mujer", foto: "img/lattafa-eclaire.jpg", destacado: true },
  { id: "lattafa-eclaire-banoffi", marca: "Lattafa", nombre: "Eclaire Banoffi", genero: "mujer", foto: "img/lattafa-eclaire-banoffi.jpg" },
  { id: "lattafa-eclaire-pistacho", marca: "Lattafa", nombre: "Eclaire Pistacho", genero: "mujer", foto: "" },
  { id: "lattafa-emaan", marca: "Lattafa", nombre: "Emaan", genero: "mujer", foto: "img/lattafa-emaan.jpg" },
  { id: "lattafa-emeer", marca: "Lattafa", nombre: "Emeer", genero: "unisex", foto: "img/lattafa-emeer.jpg" },
  { id: "lattafa-fakhar-gold", marca: "Lattafa", nombre: "Fakhar Gold", genero: "mujer", foto: "img/lattafa-fakhar-gold.jpg" },
  { id: "lattafa-fakhar-negro-y-gris", marca: "Lattafa", nombre: "Fakhar Negro y Gris", genero: "hombre", foto: "img/lattafa-fakhar-negro-y-gris.jpg" },
  { id: "lattafa-fakhar-platin", marca: "Lattafa", nombre: "Fakhar Platin", genero: "hombre", foto: "img/lattafa-fakhar-platin.jpg" },
  { id: "lattafa-fakhar-rose", marca: "Lattafa", nombre: "Fakhar Rose", genero: "mujer", foto: "img/lattafa-fakhar-rose.jpg" },
  { id: "lattafa-haya", marca: "Lattafa", nombre: "Haya", genero: "mujer", foto: "img/lattafa-haya.jpg" },
  { id: "lattafa-hayaati-black", marca: "Lattafa", nombre: "Hayaati Black", genero: "hombre", foto: "img/lattafa-hayaati-black.jpg" },
  { id: "lattafa-hayaati-florence-edp", marca: "Lattafa", nombre: "Hayaati Florence EDP", genero: "mujer", foto: "img/lattafa-hayaati-florence-edp.jpg" },
  { id: "lattafa-hayaati-gold", marca: "Lattafa", nombre: "Hayaati Gold", genero: "unisex", foto: "" },
  { id: "lattafa-hayaati-maleky-caja-azul", marca: "Lattafa", nombre: "Hayaati Maleky (caja azul)", genero: "hombre", foto: "" },
  { id: "lattafa-her-confession", marca: "Lattafa", nombre: "Her Confession", genero: "mujer", foto: "img/lattafa-her-confession.jpg" },
  { id: "lattafa-his-confession", marca: "Lattafa", nombre: "His Confession", genero: "hombre", foto: "img/lattafa-his-confession.jpg" },
  { id: "lattafa-honor-glory-bade-e-al-oud", marca: "Lattafa", nombre: "Honor & Glory Bade'e Al Oud", genero: "unisex", foto: "img/lattafa-honor-glory-bade-e-al-oud.jpg", destacado: true },
  { id: "lattafa-ishq-al-shuyukh-gold", marca: "Lattafa", nombre: "Ishq Al Shuyukh Gold", genero: "unisex", foto: "img/lattafa-ishq-al-shuyukh-gold.jpg" },
  { id: "lattafa-ishq-al-shuyukh-silver", marca: "Lattafa", nombre: "Ishq Al Shuyukh Silver", genero: "unisex", foto: "img/lattafa-ishq-al-shuyukh-silver.jpg" },
  { id: "lattafa-jasoor", marca: "Lattafa", nombre: "Jasoor", genero: "hombre", foto: "" },
  { id: "lattafa-jouri", marca: "Lattafa", nombre: "Jouri", genero: "unisex", foto: "" },
  { id: "lattafa-khamrah", marca: "Lattafa", nombre: "Khamrah", genero: "unisex", foto: "img/lattafa-khamrah.jpg", destacado: true },
  { id: "lattafa-khamrah-dukhan", marca: "Lattafa", nombre: "Khamrah Dukhan", genero: "unisex", foto: "img/lattafa-khamrah-dukhan.jpg" },
  { id: "lattafa-khamrah-qahwa", marca: "Lattafa", nombre: "Khamrah Qahwa", genero: "unisex", foto: "img/lattafa-khamrah-qahwa.jpg" },
  { id: "lattafa-khamrah-waha", marca: "Lattafa", nombre: "Khamrah Waha", genero: "unisex", foto: "img/lattafa-khamrah-waha.jpg" },
  { id: "lattafa-khanjar", marca: "Lattafa", nombre: "Khanjar", genero: "hombre", foto: "img/lattafa-khanjar.jpg" },
  { id: "lattafa-liam-blue", marca: "Lattafa", nombre: "Liam Blue", genero: "hombre", foto: "img/lattafa-liam-blue.jpg" },
  { id: "lattafa-maahir-black", marca: "Lattafa", nombre: "Maahir Black", genero: "unisex", foto: "img/lattafa-maahir-black.jpg" },
  { id: "lattafa-maahir-gold", marca: "Lattafa", nombre: "Maahir Gold", genero: "unisex", foto: "img/lattafa-maahir-gold.jpg" },
  { id: "lattafa-mayar-cherry", marca: "Lattafa", nombre: "Mayar Cherry", genero: "mujer", foto: "img/lattafa-mayar-cherry.jpg" },
  { id: "lattafa-mayar-natural-intense", marca: "Lattafa", nombre: "Mayar Natural Intense", genero: "mujer", foto: "img/lattafa-mayar-natural-intense.jpg" },
  { id: "lattafa-mayar-rosa", marca: "Lattafa", nombre: "Mayar Rosa", genero: "mujer", foto: "img/lattafa-mayar-rosa.jpg" },
  { id: "lattafa-musamam-black-intense", marca: "Lattafa", nombre: "Musamam Black Intense", genero: "hombre", foto: "img/lattafa-musamam-black-intense.jpg" },
  { id: "lattafa-musamam-white-intense", marca: "Lattafa", nombre: "Musamam White Intense", genero: "unisex", foto: "img/lattafa-musamam-white-intense.jpg" },
  { id: "lattafa-mush-salama", marca: "Lattafa", nombre: "Mush Salama", genero: "unisex", foto: "img/lattafa-mush-salama.jpg" },
  { id: "lattafa-nebras", marca: "Lattafa", nombre: "Nebras", genero: "unisex", foto: "img/lattafa-nebras.jpg" },
  { id: "lattafa-nebras-elixir", marca: "Lattafa", nombre: "Nebras Elixir", genero: "unisex", foto: "" },
  { id: "lattafa-niche-edition-ghinwa", marca: "Lattafa", nombre: "Niche Edition Ghinwa", genero: "unisex", foto: "" },
  { id: "lattafa-niche-edition-khalid", marca: "Lattafa", nombre: "Niche Edition Khalid", genero: "unisex", foto: "" },
  { id: "lattafa-niche-edition-lujain", marca: "Lattafa", nombre: "Niche Edition Lujain", genero: "unisex", foto: "" },
  { id: "lattafa-niche-edition-toleen", marca: "Lattafa", nombre: "Niche Edition Toleen", genero: "unisex", foto: "" },
  { id: "lattafa-niche-edition-zikra", marca: "Lattafa", nombre: "Niche Edition Zikra", genero: "unisex", foto: "" },
  { id: "lattafa-noble-blush-bade-e-al-oud", marca: "Lattafa", nombre: "Noble Blush Bade'e Al Oud", genero: "mujer", foto: "img/lattafa-noble-blush-bade-e-al-oud.jpg" },
  { id: "lattafa-opulent-dubai", marca: "Lattafa", nombre: "Opulent Dubai", genero: "unisex", foto: "img/lattafa-opulent-dubai.jpg" },
  { id: "lattafa-opulent-musk", marca: "Lattafa", nombre: "Opulent Musk", genero: "unisex", foto: "img/lattafa-opulent-musk.jpg" },
  { id: "lattafa-oud-for-glory-bade-e-al-oud", marca: "Lattafa", nombre: "Oud for Glory Bade'e Al Oud", genero: "unisex", foto: "img/lattafa-oud-for-glory-bade-e-al-oud.jpg" },
  { id: "lattafa-pride-pisa", marca: "Lattafa", nombre: "Pride Pisa", genero: "unisex", foto: "img/lattafa-pride-pisa.jpg" },
  { id: "lattafa-qaed-al-fursan", marca: "Lattafa", nombre: "Qaed Al Fursan", genero: "unisex", foto: "img/lattafa-qaed-al-fursan.jpg" },
  { id: "lattafa-qaed-al-fursan-blanco", marca: "Lattafa", nombre: "Qaed Al Fursan Blanco", genero: "unisex", foto: "img/lattafa-qaed-al-fursan-blanco.jpg" },
  { id: "lattafa-qimmah-men", marca: "Lattafa", nombre: "Qimmah Men", genero: "hombre", foto: "" },
  { id: "lattafa-qimmah-women", marca: "Lattafa", nombre: "Qimmah Women", genero: "mujer", foto: "" },
  { id: "lattafa-sakeena", marca: "Lattafa", nombre: "Sakeena", genero: "mujer", foto: "img/lattafa-sakeena.jpg" },
  { id: "lattafa-sheikh-al-shuyukh-azul", marca: "Lattafa", nombre: "Sheikh Al Shuyukh Azul", genero: "hombre", foto: "img/lattafa-sheikh-al-shuyukh-azul.jpg" },
  { id: "lattafa-shaheen-gold", marca: "Lattafa", nombre: "Shaheen Gold", genero: "hombre", foto: "" },
  { id: "lattafa-sublime-bade-e-al-oud", marca: "Lattafa", nombre: "Sublime Bade'e Al Oud", genero: "unisex", foto: "img/lattafa-sublime-bade-e-al-oud.jpg" },
  { id: "lattafa-taureau-de-combat", marca: "Lattafa", nombre: "Taureau de Combat", genero: "hombre", foto: "img/lattafa-taureau-de-combat.jpg" },
  { id: "lattafa-teriaq", marca: "Lattafa", nombre: "Teriaq", genero: "unisex", foto: "img/lattafa-teriaq.jpg" },
  { id: "lattafa-teriaq-intense", marca: "Lattafa", nombre: "Teriaq Intense", genero: "unisex", foto: "img/lattafa-teriaq-intense.jpg" },
  { id: "lattafa-the-kingdom-beige-femenino", marca: "Lattafa", nombre: "The Kingdom Beige (femenino)", genero: "mujer", foto: "img/lattafa-the-kingdom-beige-femenino.jpg" },
  { id: "lattafa-the-kingdom-blanc-masculino", marca: "Lattafa", nombre: "The Kingdom Blanc (masculino)", genero: "hombre", foto: "img/lattafa-the-kingdom-blanc-masculino.jpg" },
  { id: "lattafa-victoria", marca: "Lattafa", nombre: "Victoria", genero: "mujer", foto: "img/lattafa-victoria.jpg" },
  { id: "lattafa-vintage-radio", marca: "Lattafa", nombre: "Vintage Radio", genero: "unisex", foto: "img/lattafa-vintage-radio.jpg" },
  { id: "lattafa-yara-candy", marca: "Lattafa", nombre: "Yara Candy", genero: "mujer", foto: "img/lattafa-yara-candy.jpg", destacado: true },
  { id: "lattafa-yara-elixir", marca: "Lattafa", nombre: "Yara Elixir", genero: "mujer", foto: "img/lattafa-yara-elixir.jpg" },
  { id: "lattafa-yara-moi", marca: "Lattafa", nombre: "Yara Moi", genero: "mujer", foto: "img/lattafa-yara-moi.jpg" },
  { id: "lattafa-yara-rosa", marca: "Lattafa", nombre: "Yara Rosa", genero: "mujer", foto: "img/lattafa-yara-rosa.jpg" },
  { id: "lattafa-yara-tous", marca: "Lattafa", nombre: "Yara Tous", genero: "mujer", foto: "img/lattafa-yara-tous.jpg", destacado: true },

  /* Maison Alhambra */
  { id: "maison-alhambra-tenderina", marca: "Maison Alhambra", nombre: "Tenderina", genero: "mujer", foto: "img/maison-alhambra-tenderina.jpg" },
  { id: "maison-alhambra-athena", marca: "Maison Alhambra", nombre: "Athena", genero: "mujer", foto: "" },
  { id: "maison-alhambra-delilah-blanc", marca: "Maison Alhambra", nombre: "Delilah Blanc", genero: "mujer", foto: "" },
  { id: "maison-alhambra-glacier-bella", marca: "Maison Alhambra", nombre: "Glacier Bella", genero: "mujer", foto: "img/maison-alhambra-glacier-bella.jpg" },
  { id: "maison-alhambra-glacier-le-noir", marca: "Maison Alhambra", nombre: "Glacier Le Noir", genero: "hombre", foto: "" },
  { id: "maison-alhambra-jean-lowe-immortel", marca: "Maison Alhambra", nombre: "Jean Lowe Immortel", genero: "hombre", foto: "img/maison-alhambra-jean-lowe-immortel.jpg" },
  { id: "maison-alhambra-jean-lowe-noir", marca: "Maison Alhambra", nombre: "Jean Lowe Noir", genero: "hombre", foto: "img/maison-alhambra-jean-lowe-noir.jpg" },
  { id: "maison-alhambra-jorge-di-profumo-aqua", marca: "Maison Alhambra", nombre: "Jorge di Profumo Aqua", genero: "hombre", foto: "" },
  { id: "maison-alhambra-la-rouge-baroque", marca: "Maison Alhambra", nombre: "La Rouge Baroque", genero: "unisex", foto: "" },
  { id: "maison-alhambra-la-rouge-baroque-extreme", marca: "Maison Alhambra", nombre: "La Rouge Baroque Extreme", genero: "unisex", foto: "" },
  { id: "maison-alhambra-la-voie", marca: "Maison Alhambra", nombre: "La Voie", genero: "unisex", foto: "img/maison-alhambra-la-voie.jpg" },
  { id: "maison-alhambra-leonie", marca: "Maison Alhambra", nombre: "Leonie", genero: "mujer", foto: "img/maison-alhambra-leonie.jpg" },
  { id: "maison-alhambra-leonie-intense", marca: "Maison Alhambra", nombre: "Leonie Intense", genero: "mujer", foto: "img/maison-alhambra-leonie-intense.jpg" },
  { id: "maison-alhambra-papillon-d-or-femme", marca: "Maison Alhambra", nombre: "Papillon d'Or Femme", genero: "mujer", foto: "" },
  { id: "maison-alhambra-philos-pura", marca: "Maison Alhambra", nombre: "Philos Pura", genero: "unisex", foto: "img/maison-alhambra-philos-pura.jpg" },
  { id: "maison-alhambra-salvo-edp", marca: "Maison Alhambra", nombre: "Salvo EDP", genero: "hombre", foto: "img/maison-alhambra-salvo-edp.jpg" },
  { id: "maison-alhambra-salvo-elixir", marca: "Maison Alhambra", nombre: "Salvo Elixir", genero: "hombre", foto: "img/maison-alhambra-salvo-elixir.jpg" },
  { id: "maison-alhambra-salvo-intense", marca: "Maison Alhambra", nombre: "Salvo Intense", genero: "hombre", foto: "img/maison-alhambra-salvo-intense.jpg" },
  { id: "maison-alhambra-sceptre-malachite-caja-verde", marca: "Maison Alhambra", nombre: "Sceptre Malachite (caja verde)", genero: "unisex", foto: "img/maison-alhambra-sceptre-malachite-caja-verde.jpg" },
  { id: "maison-alhambra-yeah-man", marca: "Maison Alhambra", nombre: "Yeah! Man", genero: "hombre", foto: "img/maison-alhambra-yeah-man.jpg" },
  { id: "maison-alhambra-your-touch-amber", marca: "Maison Alhambra", nombre: "Your Touch Amber", genero: "unisex", foto: "img/maison-alhambra-your-touch-amber.jpg" },
  { id: "maison-alhambra-your-touch-leather", marca: "Maison Alhambra", nombre: "Your Touch Leather", genero: "unisex", foto: "" },

  /* Montale */
  { id: "montale-paris-tonka", marca: "Montale", nombre: "Paris Tonka", genero: "unisex", foto: "img/montale-paris-tonka.jpg" },

  /* Al Wataniah */
  { id: "al-wataniah-ameerati", marca: "Al Wataniah", nombre: "Ameerati", genero: "mujer", foto: "img/al-wataniah-ameerati.jpg" },

  /* Asdaaf */
  { id: "asdaaf-ameerat-al-arab-edp-caja-roja", marca: "Asdaaf", nombre: "Ameerat Al Arab EDP (caja roja)", genero: "mujer", foto: "img/asdaaf-ameerat-al-arab-edp-caja-roja.jpg" },
  { id: "asdaaf-ameerat-al-arab-prive-rose-caja-rosa", marca: "Asdaaf", nombre: "Ameerat Al Arab Privé Rose (caja rosa)", genero: "mujer", foto: "img/asdaaf-ameerat-al-arab-prive-rose-caja-rosa.jpg" },

  /* Otros */
  { id: "otros-momento-riffs", marca: "Otros", nombre: "Momento Riffs", genero: "unisex", foto: "img/otros-momento-riffs.jpg" },

  /* Dumont */
  { id: "dumont-nitro-red", marca: "Dumont", nombre: "Nitro Red", genero: "hombre", foto: "img/dumont-nitro-red.jpg" },

  /* Al Wataniah */
  { id: "al-wataniah-sabah-al-ward", marca: "Al Wataniah", nombre: "Sabah Al Ward", genero: "mujer", foto: "img/al-wataniah-sabah-al-ward.jpg" },

  /* Otros */
  { id: "otros-stallion-valentino-uomo-intense", marca: "Otros", nombre: "Stallion Valentino Uomo Intense", genero: "hombre", foto: "" },

  /* Emper */
  { id: "emper-stallion-53", marca: "Emper", nombre: "Stallion 53", genero: "unisex", foto: "img/emper-stallion-53.jpg" },

  /* Otros */
  { id: "otros-zakat-world-cup-vip", marca: "Otros", nombre: "Zakat World Cup VIP", genero: "hombre", foto: "img/otros-zakat-world-cup-vip.jpg" },

  /* Paco Rabanne */
  { id: "paco-rabanne-invictus", marca: "Paco Rabanne", nombre: "Invictus", genero: "hombre", foto: "img/paco-rabanne-invictus.jpg" },
  { id: "paco-rabanne-1-million", marca: "Paco Rabanne", nombre: "1 Million", genero: "hombre", foto: "img/paco-rabanne-1-million.jpg" },

  /* Rasasi */
  { id: "rasasi-hawas-black", marca: "Rasasi", nombre: "Hawas Black", genero: "hombre", foto: "img/rasasi-hawas-black.jpg" },
  { id: "rasasi-hawas-diva", marca: "Rasasi", nombre: "Hawas Diva", genero: "mujer", foto: "" },
  { id: "rasasi-hawas-eclat-femenino", marca: "Rasasi", nombre: "Hawas Éclat (femenino)", genero: "mujer", foto: "img/rasasi-hawas-eclat-femenino.jpg" },
  { id: "rasasi-hawas-elixir", marca: "Rasasi", nombre: "Hawas Elixir", genero: "hombre", foto: "img/rasasi-hawas-elixir.jpg" },
  { id: "rasasi-hawas-for-her", marca: "Rasasi", nombre: "Hawas For Her", genero: "mujer", foto: "img/rasasi-hawas-for-her.jpg" },
  { id: "rasasi-hawas-for-him", marca: "Rasasi", nombre: "Hawas For Him", genero: "hombre", foto: "img/rasasi-hawas-for-him.jpg", destacado: true },
  { id: "rasasi-hawas-for-him-fire", marca: "Rasasi", nombre: "Hawas For Him Fire", genero: "hombre", foto: "img/rasasi-hawas-for-him-fire.jpg" },
  { id: "rasasi-hawas-ice", marca: "Rasasi", nombre: "Hawas Ice", genero: "hombre", foto: "img/rasasi-hawas-ice.jpg" },
  { id: "rasasi-hawas-kobra", marca: "Rasasi", nombre: "Hawas Kobra", genero: "hombre", foto: "img/rasasi-hawas-kobra.jpg" },
  { id: "rasasi-hawas-malibu", marca: "Rasasi", nombre: "Hawas Malibu", genero: "hombre", foto: "img/rasasi-hawas-malibu.jpg" },
  { id: "rasasi-hawas-pink", marca: "Rasasi", nombre: "Hawas Pink", genero: "mujer", foto: "img/rasasi-hawas-pink.jpg" },
  { id: "rasasi-hawas-tropical", marca: "Rasasi", nombre: "Hawas Tropical", genero: "hombre", foto: "img/rasasi-hawas-tropical.jpg" },
  { id: "rasasi-hawas-verde", marca: "Rasasi", nombre: "Hawas Verde", genero: "hombre", foto: "img/rasasi-hawas-verde.jpg" },

  /* Rayhaan */
  { id: "rayhaan-aquatica", marca: "Rayhaan", nombre: "Aquatica", genero: "unisex", foto: "img/rayhaan-aquatica.jpg" },
  { id: "rayhaan-corium", marca: "Rayhaan", nombre: "Corium", genero: "hombre", foto: "img/rayhaan-corium.jpg" },
  { id: "rayhaan-crimson-caja-roja", marca: "Rayhaan", nombre: "Crimson (caja roja)", genero: "unisex", foto: "img/rayhaan-crimson-caja-roja.jpg" },
  { id: "rayhaan-elixir", marca: "Rayhaan", nombre: "Elixir", genero: "hombre", foto: "img/rayhaan-elixir.jpg" },
  { id: "rayhaan-italia", marca: "Rayhaan", nombre: "Italia", genero: "unisex", foto: "img/rayhaan-italia.jpg" },
  { id: "rayhaan-jungle-vibe", marca: "Rayhaan", nombre: "Jungle Vibe", genero: "unisex", foto: "img/rayhaan-jungle-vibe.jpg" },
  { id: "rayhaan-lion", marca: "Rayhaan", nombre: "Lion", genero: "hombre", foto: "img/rayhaan-lion.jpg" },
  { id: "rayhaan-obsidian", marca: "Rayhaan", nombre: "Obsidian", genero: "hombre", foto: "img/rayhaan-obsidian.jpg" },
  { id: "rayhaan-pacific", marca: "Rayhaan", nombre: "Pacific", genero: "hombre", foto: "img/rayhaan-pacific.jpg" },
  { id: "rayhaan-wolf", marca: "Rayhaan", nombre: "Wolf", genero: "hombre", foto: "" },
  { id: "rayhaan-terra", marca: "Rayhaan", nombre: "Terra", genero: "unisex", foto: "img/rayhaan-terra.jpg" },
  { id: "rayhaan-tropical-vibe", marca: "Rayhaan", nombre: "Tropical Vibe", genero: "unisex", foto: "img/rayhaan-tropical-vibe.jpg" },

  /* Valentino */
  { id: "valentino-born-in-roma-uomo-intense", marca: "Valentino", nombre: "Born in Roma Uomo Intense", genero: "hombre", foto: "img/valentino-born-in-roma-uomo-intense.jpg" },

  /* Versace */
  { id: "versace-eros-edp", marca: "Versace", nombre: "Eros EDP", genero: "hombre", foto: "img/versace-eros-edp.jpg" },
  { id: "versace-eros-flame-parfum", marca: "Versace", nombre: "Eros Flame Parfum", genero: "hombre", foto: "img/versace-eros-flame-parfum.jpg" },

  /* Xerjoff */
  { id: "xerjoff-erba-pura", marca: "Xerjoff", nombre: "Erba Pura", genero: "unisex", foto: "img/xerjoff-erba-pura.jpg" },

  /* Yves Saint Laurent */
  { id: "yves-saint-laurent-myslf", marca: "Yves Saint Laurent", nombre: "MYSLF", genero: "hombre", foto: "" },

  /* ---------------- VARIOS (no son perfumes) ---------------- */
  { id: "varios-auriculares-pro", categoria: "varios", marca: "Accesorios", nombre: "Auriculares inalámbricos tipo AirPods Pro", foto: "img/varios-auriculares-pro.jpg", destacado: true,
    descripcion: "Auriculares inalámbricos con estuche de carga. Consultá modelos disponibles." },
  { id: "varios-cargador-20w-cable-lightning", categoria: "varios", marca: "Accesorios", nombre: "Cargador 20W USB-C + cable a Lightning", foto: "img/varios-cargador-20w-cable-lightning.jpg", destacado: true,
    descripcion: "Fuente de carga rápida 20W con salida USB-C y cable USB-C a Lightning de 1 metro." },
  { id: "varios-bateria-magnetica", categoria: "varios", marca: "Accesorios", nombre: "Batería magnética para iPhone", foto: "img/varios-bateria-magnetica.jpg",
    descripcion: "Batería portátil magnética que se pega atrás del iPhone. Consultá compatibilidad con tu modelo." },
  { id: "varios-fundas-silicona-iphone", categoria: "varios", marca: "Accesorios", nombre: "Fundas de silicona para iPhone", foto: "img/varios-fundas-silicona-iphone.jpg", destacado: true,
    descripcion: "Fundas de silicona en muchos colores. Consultá por tu modelo de iPhone y los colores disponibles." },
  { id: "karseell-maca-power-collagen", categoria: "varios", marca: "Karseell", nombre: "Maca Power Collagen", foto: "" },
  { id: "karseell-combo", categoria: "varios", marca: "Karseell", nombre: "Combo Karseell", foto: "" },
];
