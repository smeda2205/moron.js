var MoronModel = require('moron').MoronModel;

/**
 * @extends MoronModel
 * @constructor
 */
function Movie() {
  MoronModel.apply(this, arguments);
}

MoronModel.extend(Movie);
module.exports = Movie;

// Table name is the only required property.
Movie.tableName = 'Movie';

// This is not the database schema! Nothing is generated based on this. Whenever a
// Movie object is created from a JSON object, the JSON is checked against this
// schema. For example when you call Movie.fromJson({name: 'Matrix'});
Movie.jsonSchema = {
  type: 'object',
  required: ['name'],

  properties: {
    id: {type: 'integer'},
    name: {type: 'string', minLength: 1, maxLength: 255}
  }
};

// This object defines the relations to other models.
Movie.relationMappings = {
  actors: {
    relation: MoronModel.ManyToManyRelation,
    // The related model. This can be either a MoronModel subclass constructor or an
    // absolute file path to a module that exports one. We use the file path version
    // here to prevent require loops.
    modelClass: __dirname + '/Person',
    join: {
      from: 'Movie.id',
      // ManyToMany relation needs the `through` object to describe the join table.
      through: {
        from: 'Person_Movie.movieId',
        to: 'Person_Movie.personId'
      },
      to: 'Person.id'
    }
  }
};
