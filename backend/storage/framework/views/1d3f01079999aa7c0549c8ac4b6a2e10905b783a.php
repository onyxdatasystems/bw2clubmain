<nav class="profile-nav">
    <ul class="nav align-items-center">
        <li class="nav-item <?php if(str_contains(url()->current(), 'group/view/details')): ?> active <?php endif; ?>"><a href="<?php echo e(route('single.group',$group->id)); ?>"
                class="nav-link"><?php echo e(get_phrase('Discussion')); ?></a></li>
        <li class="nav-item <?php if(str_contains(url()->current(), 'group/peopel/info/')): ?> active <?php endif; ?>"><a href="<?php echo e(route('group.people.info',$group->id)); ?>" class="nav-link"><?php echo e(get_phrase('People')); ?></a>
        </li>
        <li class="nav-item <?php if(str_contains(url()->current(), 'group/event/view/')): ?> active <?php endif; ?>"><a href="<?php echo e(route('group.event.view',$group->id)); ?>" class="nav-link"><?php echo e(get_phrase('Events')); ?></a>
        </li>
        <li class="nav-item <?php if(str_contains(url()->current(), 'group/photo/view')): ?> active <?php endif; ?>"><a href="<?php echo e(route('single.group.photos',$group->id)); ?>" class="nav-link"><?php echo e(get_phrase('Media')); ?></a>
        </li>
    </ul>
</nav><?php /**PATH /Applications/MAMP/htdocs/Sociopro_2.6/Sociopro/resources/views/frontend/groups/iner-nav.blade.php ENDPATH**/ ?>