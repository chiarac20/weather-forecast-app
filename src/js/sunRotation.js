function getAngleDegree (sunrise, sunset, now) {
    const partialResult=(now-sunrise)/(sunset-sunrise);
    return partialResult * 180 -90;
}

export default {
    getAngleDegree
}