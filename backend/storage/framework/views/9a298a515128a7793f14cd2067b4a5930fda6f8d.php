<div class="table-responsive">
    <table class="table eTable w-100" id="server_side_users_data">
        <thead>
            <tr>
                <th>#</th>
                <th><?php echo e(get_phrase('Name')); ?></th>
                <th class="text-center"><?php echo e(get_phrase('Amount')); ?></th>
                <th class="text-center"><?php echo e(get_phrase('Issue Date')); ?></th>
                <th class="text-center"><?php echo e(get_phrase('Payout Date')); ?></th>
                <th class="text-center"><?php echo e(get_phrase('Method')); ?></th>
                <th class="text-center"><?php echo e(get_phrase('Status')); ?></th>
                <?php if($type == 'pending'): ?>
                    <th class="text-center"><?php echo e(get_phrase('Actions')); ?></th>
                <?php endif; ?>
            </tr>
        </thead>
        <tbody>
            <?php $__currentLoopData = $reports; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $key => $report): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <?php
                    $info = DB::table('users')
                        ->where('id', $report->user_id)
                        ->first();
                ?>
                <tr>
                    <td><?php echo e($reports->firstItem() + $key); ?></td>
                    <td><?php echo e($info->name); ?></td>
                    <td class="text-center"><b><?php echo e($report->requested_amount); ?>$</b></td>
                    <td class="text-center"><?php echo e($report->issue_date); ?></td>
                    <td class="text-center"><?php echo e($report->received_date); ?></td>
                    <td class="text-center"><?php echo e($report->payment_method); ?></td>
                    <td class="text-center">
                        <?php if($report->status > 0): ?>
                            <button class="btn btn-success" disabled>
                                <i class="fa-solid fa-check-double me-2" style="font-size: 12px"></i>Paid</button>
                        <?php else: ?>
                            <a href="<?php echo e(route('campaign.payout', ['id' => $report->id])); ?>" class="btn btn-danger">
                                <i class="fa-regular fa-credit-card me-2" style="font-size: 12px"></i>Pay</a>
                        <?php endif; ?>
                    </td>

                    <?php if($type == 'pending'): ?>
                        <td class="text-center">
                            <?php if($report->status > 0): ?>
                                <button class="btn btn-light" disabled>Delete</button>
                            <?php else: ?>
                                <a href="<?php echo e(route('delete.payout', ['id' => $report->id])); ?>"
                                    class="btn btn-danger">Delete</a>
                            <?php endif; ?>
                        </td>
                    <?php endif; ?>

                </tr>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </tbody>
    </table>

    <div class="d-flex justify-content-end">
        <?php echo e($reports->links()); ?>

    </div>
</div>
<?php /**PATH /home/hospitalpicks/public_html/bwclub.hospitalpicks.com/resources/views/backend/admin/fundraiser/payout_success.blade.php ENDPATH**/ ?>