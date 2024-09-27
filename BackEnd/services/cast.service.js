const Cast=require('../models/cast.model')
exports.createCast=async(castMember, movieId)=>{
    const person = await createOrUpdatePerson(castMember); // Create or update person first
    const cast = new Cast({
      person_id: person._id,
      character: castMember.character,
      movie_id: movieId,
    });
    await cast.save();
    return cast._id;
}