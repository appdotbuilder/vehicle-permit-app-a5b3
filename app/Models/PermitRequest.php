<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\PermitRequest
 *
 * @property int $id
 * @property int $employee_id
 * @property \Illuminate\Support\Carbon $start_datetime
 * @property \Illuminate\Support\Carbon $end_datetime
 * @property string $vehicle_type
 * @property string $license_plate
 * @property string $status
 * @property string|null $notes
 * @property int|null $reviewed_by
 * @property \Illuminate\Support\Carbon|null $reviewed_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Employee $employee
 * @property-read \App\Models\User|null $reviewer
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|PermitRequest newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PermitRequest newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PermitRequest query()
 * @method static \Illuminate\Database\Eloquent\Builder|PermitRequest whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PermitRequest whereEmployeeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PermitRequest whereEndDatetime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PermitRequest whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PermitRequest whereLicensePlate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PermitRequest whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PermitRequest whereReviewedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PermitRequest whereReviewedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PermitRequest whereStartDatetime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PermitRequest whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PermitRequest whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PermitRequest whereVehicleType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PermitRequest pending()
 * @method static \Illuminate\Database\Eloquent\Builder|PermitRequest approved()
 * @method static \Illuminate\Database\Eloquent\Builder|PermitRequest rejected()
 * @method static \Database\Factories\PermitRequestFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class PermitRequest extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'employee_id',
        'start_datetime',
        'end_datetime',
        'vehicle_type',
        'license_plate',
        'status',
        'notes',
        'reviewed_by',
        'reviewed_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_datetime' => 'datetime',
        'end_datetime' => 'datetime',
        'reviewed_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the employee that made this permit request.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    /**
     * Get the user who reviewed this permit request.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    /**
     * Scope a query to only include pending requests.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include approved requests.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope a query to only include rejected requests.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }
}