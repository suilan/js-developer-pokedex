
class Pokemon {
    id;
    name;
    type;
    types = [];
    photo;
    details;

    loadPhoto() {
        return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/'+this.id+'.svg';
    }
}


