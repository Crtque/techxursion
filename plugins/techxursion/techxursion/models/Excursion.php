<?php namespace Techxursion\Techxursion\Models;

use Model;

/**
 * Model
 */
class Excursion extends Model
{
    use \Winter\Storm\Database\Traits\Validation;
    
    /*
     * Disable timestamps by default.
     * Remove this line if timestamps are defined in the database table.
     */
    public $timestamps = false;


    /**
     * @var string The database table used by the model.
     */
    public $table = 'techxursion_techxursion_excursions';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    public $belongsTo = [
        'city' => \Techxursion\Techxursion\Models\City::class
    ];
    
    
    public $attachOne = [
        'model' => 'System\Models\File'
    ];

    /**
     * @var array Attribute names to encode and decode using JSON.
     */
    public $jsonable = [];
}
