// Database of Invincible characters with their attributes
const charactersDB = [
    {
        name: "Mark Grayson",
        gender: "Male",
        species: ["Human", "Viltrumite"],
        homePlanet: "Earth",
        alignment: "Hero",
        affiliation: "Guardians of the Globe",
        image: "https://media.tenor.com/zb1FwV2kp1gAAAAe/who-is-that-mark-grayson.png"
    },
    {
        name: "Anissa",
        gender: "Female",
        species: "Viltrumite",
        homePlanet: "Viltrum",
        alignment: "Villain",
        affiliation: "Viltrum Empire",
        image: "https://media.tenor.com/Ivkyo57RuCgAAAAe/anissa-invincible.png"
    },
    {
        name: "Thula",
        gender: "Female",
        species: "Viltrumite",
        homePlanet: "Viltrum",
        alignment: "Villain",
        affiliation: "Viltrum Empire",
        image: "https://i.redd.it/6wr7uitzm33c1.png"
    },
    {
        name: "Titan",
        gender: "Male",
        species: ["Human", "Enhanced"],
        homePlanet: "Earth",
        alignment: "Villain",
        affiliation: ["Machine Head", "Isotope"],
        image: "https://static0.wikia.nocookie.net/amazon-invincible/images/c/c8/Titan_invincible_27s670_%284%29.png/revision/latest/scale-to-width-down/1200?cb=20210327234518"
    },
    {
        name: "Nolan Grayson",
        gender: "Male",
        species: "Viltrumite",
        homePlanet: ["Viltrum", "Earth"],
        alignment: "Villain",
        affiliation: ["Viltrum Empire", "Mark Grayson"],
        image: "https://totalapexentertainment.com/wp-content/uploads/2024/10/Omni-Man-Invincible-Season-1.jpeg"
    },
    {
        name: "Conquest",
        gender: "Male",
        species: "Viltrumite",
        homePlanet: "Viltrum",
        alignment: "Villain",
        affiliation: "Viltrum Empire",
        image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4699dc2a-75a7-4568-8975-d8aeaec5f5c3/deoru4r-4190de76-04a7-41c6-b3ab-b3330847779c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzQ2OTlkYzJhLTc1YTctNDU2OC04OTc1LWQ4YWVhZWM1ZjVjM1wvZGVvcnU0ci00MTkwZGU3Ni0wNGE3LTQxYzYtYjNhYi1iMzMzMDg0Nzc3OWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.uNuVh_WMAy6-hnsZqeLMvZlNd32RF_FVxkxbsGTeA_0"
    },
    {
        name: "Kregg",
        gender: "Male",
        species: "Viltrumite",
        homePlanet: "Viltrum",
        alignment: "Villain",
        affiliation: "Viltrum Empire",
        image: "https://static0.wikia.nocookie.net/amazon-invincible/images/d/d5/Kreggg.png/revision/latest/smart/width/386/height/259?cb=20240422204239"
    },
    {
        name: "Lucan",
        gender: "Male",
        species: "Viltrumite",
        homePlanet: "Viltrum",
        alignment: "Villain",
        affiliation: "Viltrum Empire",
        image: "https://comicbookclublive.com/wp-content/uploads/2023/11/lucan-invincible-jpg.webp"
    },
    {
        name: "Thaedus",
        gender: "Male",
        species: "Viltrumite",
        homePlanet: ["Viltrum", "Talescria"],
        alignment: "Villain",
        affiliation: ["Viltrum Empire", "Coalition of Planets"],
        image: "https://static0.wikia.nocookie.net/amazon-invincible/images/a/a3/Thaedus_Mustache.png/revision/latest?cb=20240314113731"
    },
    {
        name: "Eve Wilkins",
        gender: "Female",
        species: ["Human", "Enhanced"],
        homePlanet: "Earth",
        alignment: "Hero",
        affiliation: ["Teen Team", "Guardians of the Globe", "Mark Grayson"],
        image: "https://i.pinimg.com/474x/5c/a0/3b/5ca03b300ffa2ba173d3bf6fa777b032.jpg"
    },
    {
        name: "Rex Sloan",
        gender: "Male",
        species: ["Human", "Enhanced"],
        homePlanet: "Earth",
        alignment: "Hero",
        affiliation: ["Teen Team", "Guardians of the Globe"],
        image: "https://images.thedirect.com/media/article_full/rex-invin.jpg"
    },
    {
        name: "William Clockwell",
        gender: "Male",
        species: "Human",
        homePlanet: "Earth",
        alignment: "Civilian",
        affiliation: "None",
        image: "https://i.redd.it/5iyupilz41pc1.jpeg"
    },
    {
        name: "Cecil Stedman",
        gender: "Male",
        species: "Human",
        homePlanet: "Earth",
        alignment: "Neutral",
        affiliation: ["Global Defense Agency", "Guardians of the Globe"],
        image: "https://beebom.com/wp-content/uploads/2024/12/Cecil.jpg?w=1024"
    },
    {
        name: "D.A. Sinclair",
        gender: "Male",
        species: "Human",
        homePlanet: "Earth",
        alignment: "Villain",
        affiliation: "Global Defense Agency",
        image: "https://static0.wikia.nocookie.net/imagecomics/images/e/ec/D.A._Sinclair.PNG.webp/revision/latest/thumbnail/width/360/height/450?cb=20230329154412"
    },
    {
        name: "Damien Darkblood",
        gender: "Male",
        species: "Demon",
        homePlanet: "Hell",
        alignment: "Neutral",
        affiliation: "Global Defense Agency",
        image: "https://static0.wikia.nocookie.net/amazon-invincible/images/3/37/Invincible_detective_suspisios_demon_vlcsnap-2021-03-26-13h57m02s459.png/revision/latest/scale-to-width-down/1200?cb=20210327233158"
    },
    {
        name: "Allen the Alien",
        gender: "Male",
        species: "Unopan",
        homePlanet: ["Talescria", "Unopa"],
        alignment: "Hero",
        affiliation: "Coalition of Planets",
        image: "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/03/invincible-allen-the-alien-season-2-anissa-4.jpg"
    },
    {
        name: "Powerplex",
        gender: "Male",
        species: ["Human", "Enhanced"],
        homePlanet: "Earth",
        alignment: "Villain",
        affiliation: "Global Defense Agency",
        image: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2025/02/invincible-season-3-ep-6-16.jpg"
    },
    {
        name: "Debbie Grayson",
        gender: "Female",
        species: "Human",
        homePlanet: "Earth",
        alignment: "Civilian",
        affiliation: ["Mark Grayson", "Nolan Grayson"],
        image: "https://i.redd.it/e5wu6tc5plx61.jpg"
    },
    {
        name: "Oliver Grayson",
        gender: "Male",
        species: ["Viltrumite", "Thraxan"],
        homePlanet: ["Thraxa", "Earth"],
        alignment: "Civilian",
        affiliation: ["Mark Grayson", "Nolan Grayson"],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAjwUrStgpPiSAUZyWD6179aHE9m1dZuS6Sg&s"
    },
    {
        name: "Robot",
        gender: "Male",
        species: ["Human", "Clone"],
        homePlanet: "Earth",
        alignment: "Hero",
        affiliation: ["Guardians of the Globe", "Teen Team"],
        image: "https://i.redd.it/topabeimm0tb1.jpg"
    },
    {
        name: "Shapesmith",
        gender: "Male",
        species: "Martian",
        homePlanet: "Mars",
        alignment: "Hero",
        affiliation: ["Guardians of the Globe", "Mark Grayson"],
        image: "https://hips.hearstapps.com/hmg-prod/images/screen-shot-2023-11-13-at-4-09-13-pm-6552909425add.png?crop=0.7453703703703703xw:1xh;center,top&resize=1200:*"
    },
    {
        name: "Shrinking Rae",
        gender: "Female",
        species: ["Human", "Enhanced"],
        homePlanet: "Earth",
        alignment: "Hero",
        affiliation: ["Guardians of the Globe", "Teen Team"],
        image: "https://static0.wikia.nocookie.net/amazon-invincible/images/c/c2/Rae.jpg/revision/latest?cb=20240407175544"
    },
    {
        name: "Amber Bennett",
        gender: "Female",
        species: "Human",
        homePlanet: "Earth",
        alignment: "Civilian",
        affiliation: "None",
        image: "https://static0.wikia.nocookie.net/amazon-invincible/images/5/5e/Amber_Bennett.png/revision/latest?cb=20210327122152"
    },
    {
        name: "Angstrom Levy",
        gender: "Male",
        species: ["Human", "Enhanced"],
        homePlanet: "Earth",
        alignment: "Villain",
        affiliation: "None",
        image: "https://static0.wikia.nocookie.net/villains/images/8/8a/Angstrom_Levy_TV.png/revision/latest/scale-to-width/360?cb=20250215221933"
    },
    {
        name: "Battle Beast",
        gender: "Male",
        species: "Alien",
        homePlanet: "Unknown",
        alignment: "Villain",
        affiliation: "Intergalactic Warrior",
        image: "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/11/invincible-battle-beast.jpg"
    },
    {
        name: "Donald Ferguson",
        gender: "Male",
        species: ["Human", "Cyborg"],
        homePlanet: "Earth",
        alignment: "Neutral",
        affiliation: "Global Defense Agency",
        image: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/01/donald-ferguson-in-invincible.jpg"
    },
    {
        name: "Art Rosenbaum",
        gender: "Male",
        species: "Human",
        homePlanet: "Earth",
        alignment: "Civilian",
        affiliation: ["Nolan Grayson", "Mark Grayson"],
        image: "https://static0.wikia.nocookie.net/amazon-invincible/images/3/3e/Art_Rosenbaum.png/revision/latest?cb=20210329124454"
    },
    {
        name: "Monster Girl",
        gender: "Female",
        species: ["Human", "Monster"],
        homePlanet: "Earth",
        alignment: "Hero",
        affiliation: ["Guardians of the Globe", "Teen Team"],
        image: "https://carboncostume.com/wordpress/wp-content/uploads/2021/05/monstergirl-invincible-character.jpg"
    },
    {
        name: "Multi Paul",
        gender: "Male",
        species: ["Human", "Cursed"],
        homePlanet: "Earth",
        alignment: "Villain",
        affiliation: "The Order",
        image: "https://static0.srcdn.com/wordpress/wp-content/uploads/2025/02/invincible-multi-paul-clones.jpg"
    },
    {
        name: "Black Samson",
        gender: "Male",
        species: "Human",
        homePlanet: "Earth",
        alignment: "Hero",
        affiliation: "Guardians of the Globe",
        image: "https://assets.mycast.io/characters/black-samson-71277-normal.jpg?1618241732"
    },
    {
        name: "Bulletproof",
        gender: "Male",
        species: "Human",
        homePlanet: "Earth",
        alignment: "Hero",
        affiliation: ["Guardians of the Globe", "Teen Team"],
        image: "https://static0.wikia.nocookie.net/amazon-invincible/images/c/c8/Bulletproof.png/revision/latest?cb=20231207044115"
    },
    {
        name: "Darkwing",
        gender: "Male",
        species: "Human",
        homePlanet: "Earth",
        alignment: "Hero",
        affiliation: "Guardians of the Globe",
        image: "https://static0.wikia.nocookie.net/amazon-invincible/images/6/63/Darkwing.png/revision/latest?cb=20231212015041"
    },
    {
        name: "Dupli-Kate",
        gender: "Female",
        species: ["Human", "Cursed"],
        homePlanet: "Earth",
        alignment: "Hero",
        affiliation: "Guardians of the Globe",
        image: "https://s.yimg.com/ny/api/res/1.2/Op6cfxlpb6j6dDzVkfKTgA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyNDI7aD02OTk-/https://media.zenfs.com/en/mandatory_995/0ea60794de96e6d99de562b08980ec38"
    },
    {
        name: "The Immortal",
        gender: "Male",
        species: ["Human", "Enhanced"],
        homePlanet: "Earth",
        alignment: "Hero",
        affiliation: "Guardians of the Globe",
        image: "https://i.redd.it/kpd5tlaqvuyb1.jpg"
    },
    {
        name: "War Woman",
        gender: "Female",
        species: ["Human", "Enhanced"],
        homePlanet: "Earth",
        alignment: "Hero",
        affiliation: "Guardians of the Globe",
        image: "https://static0.wikia.nocookie.net/amazon-invincible/images/6/6b/War_Woman_Invincible_14m30s965.png/revision/latest?cb=20210328001413"
    },
    {
        name: "Aquarus",
        gender: "Male",
        species: "Atlantean",
        homePlanet: "Earth",
        alignment: "Hero",
        affiliation: "Guardians of the Globe",
        image: "https://static0.wikia.nocookie.net/amazon-invincible/images/d/df/Aquarus_called_into_action.png/revision/latest?cb=20210403175427"
    },
    {
        name: "Green Ghost",
        gender: "Female",
        species: ["Human", "Enhanced"],
        homePlanet: "Earth",
        alignment: "Hero",
        affiliation: "Guardians of the Globe",
        image: "https://static0.wikia.nocookie.net/amazon-invincible/images/4/4e/GreenGhostE1ed.jpg/revision/latest?cb=20231122183608"
    },
    {
        name: "Isotope",
        gender: "Male",
        species: ["Human", "Enhanced"],
        homePlanet: "Earth",
        alignment: "Villain",
        affiliation: ["Machine Head", "Titan"],
        image: "https://static0.wikia.nocookie.net/amazon-invincible/images/4/4c/Isotope_ep_5_Invincible_%28289%29.png/revision/latest/smart/width/386/height/259?cb=20210409150007"
    },
    {
        name: "Machine Head",
        gender: "Male",
        species: ["Human","Cyborg"],
        homePlanet: "Earth",
        alignment: "Villain",
        affiliation: ["Isotope", "Titan"],
        image: "https://static0.wikia.nocookie.net/amazon-invincible/images/b/b9/Machine_Head_ep_5_Invincible_Amazon.png/revision/latest?cb=20210409154211"
    },
    {
        name: "King Lizard",
        gender: "Male",
        species: "Human",
        homePlanet: "Earth",
        alignment: "Villain",
        affiliation: "Lizard League",
        image: "https://static0.wikia.nocookie.net/amazon-invincible/images/0/05/King_Lizard.png/revision/latest?cb=20231210093827"
    },
    {
        name: "Mister Liu",
        gender: "Male",
        species: "Human",
        homePlanet: "Earth",
        alignment: "Villain",
        affiliation: "The Order",
        image: "https://static0.wikia.nocookie.net/amazon-invincible/images/b/b5/Mister_Liu_human_form_Invincible_%2848%29.png/revision/latest?cb=20210430075412"
    },
    {
        name: "Mauler Twins",
        gender: "Male",
        species: "Unknown",
        homePlanet: "Earth",
        alignment: "Villain",
        affiliation: "None",
        image: "https://static0.wikia.nocookie.net/amazon-invincible/images/1/1f/The_Mauler_Twins_smile_Invincible_ep_6_%2872%29.png/revision/latest/scale-to-width-down/1200?cb=20210416085309"
    },
    {
        name: "Red Rush",
        gender: "Male",
        species: ["Human", "Enhanced"],
        homePlanet: "Earth",
        alignment: "Hero",
        affiliation: "Guardians of the Globe",
        image: "https://static0.wikia.nocookie.net/amazon-invincible/images/d/d3/Red_Rush_Invincible_95_%2814%29.png/revision/latest?cb=20210328001123"
    },
    {
        name: "Martian Man",
        gender: "Male",
        species: "Martian",
        homePlanet: "Mars",
        alignment: "Hero",
        affiliation: "Guardians of the Globe",
        image: "https://static0.wikia.nocookie.net/amazon-invincible/images/4/45/Martian_Man_Invincible_55s710_%282%29.png/revision/latest?cb=20210328000745"
    },
    {
        name: "Doc Seismic",
        gender: "Male",
        species: "Human",
        homePlanet: "Earth",
        alignment: "Villain",
        affiliation: "None",
        image: "https://static0.wikia.nocookie.net/amazon-invincible/images/0/04/Doc_Seismic_Invincible_s318_%284%29.png/revision/latest/scale-to-width-down/1200?cb=20210328000452"
    }
];

// Export the character database for use in other files
window.charactersDB = charactersDB; 