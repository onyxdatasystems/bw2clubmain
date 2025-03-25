    <?php
        $query = DB::table('paid_content_creators')
            ->where('user_id', auth()->user()->id)
            ->first();
    ?>


    <div class="settings-wraper paid_wraper overflow-visible">
        
        <div class="bg-white box-shadow-5 p-20 mb-20  radius-8 text-center">
            <?php if($query): ?>
                <?php if($query->status == -1): ?>
                    <h3 class="fz-28-sb-38-black m-0"><?php echo e(get_phrase('Please wait, Admin will response soon.')); ?></h3>
                <?php elseif($query->status == 0): ?>
                    <h3 class="fz-28-sb-38-black m-0"><?php echo e(get_phrase('Admin temporarily deactivated your page.')); ?></h3>
                <?php endif; ?>
            <?php else: ?>
                <?php echo $__env->make('frontend.paid_content.get_started', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
            <?php endif; ?>
        </div>

        <div class="bg-white box-shadow-5  radius-8 p-20 px-20">
            <div class="d-flex flex-wrap g-15 mb-20">
                <?php echo $__env->make('frontend.paid_content.search', ['type' => 'creator'], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
            </div>
            <!-- Creator list -->
            <?php if($creators->count() > 0): ?>
                <div class="creator-items-wrap">
                    <div class="row">
                        <?php $__currentLoopData = $creators; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $creator): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                            <div class="col-xl-3 col-lg-4 col-md-3 col-sm-4 col-6">
                                <div class="crator-items">
                                    <img src="<?php echo e(asset('assets/frontend/images/' . $creator->cover_photo)); ?>"
                                        alt="" />
                                    <a href="<?php echo e(route('page.view', ['page' => $creator->title, 'id' => $creator->user_id])); ?>"
                                        class="link"><?php echo e($creator->title); ?></a>
                                </div>
                            </div>
                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                    </div>
                </div>
            <?php else: ?>
                <div class="no-package d-flex justify-content-center align-items-center py-4 mt-3">
                    <p class="text-16px fw-bolder" style="color: #101010"><?php echo e(get_phrase('No creator is available')); ?></p>
                </div>
            <?php endif; ?>
        </div>
    </div>
<?php /**PATH /home/hospitalpicks/public_html/bwclub.hospitalpicks.com/resources/views/frontend/paid_content/general_timeline.blade.php ENDPATH**/ ?>