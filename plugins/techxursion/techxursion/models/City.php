<?php namespace Techxursion\Techxursion\Models;

use Model;

/**
 * Model
 */
class City extends Model
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
    public $table = 'techxursion_techxursion_cities';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    
    public $attachMany = [
        'pictures' => 'System\Models\File'
    ];

    public $hasMany = [
        'excursions'=> \Techxursion\Techxursion\Models\Excursion::class
    ];
    
    /**
     * @var array Attribute names to encode and decode using JSON.
     */
    public $jsonable = ['pictures2'];
}
